---
title: 'Shader playground'
tagline: 'Teaching myself graphics programming'
createdAt: '2025-07-15T16:39+03:00'
tags: ['pet-project', 'webdev', 'wag']
wordCount: 1738
---

As a part of [wag](/blog/wag-intro), I've set out to learn some basic graphics
programming to add visual effects to the game. Pretty quickly I realized that
the iteration cycle in game was not optimal and made a minimal bevy project just
to dev shaders in. Then about a month or two back it got pretty cumbersome to
use even for that and I added some controls to it to better view different
effects.

I'd like to work as a graphics programmer at a game studio one day, so making
the playground to an exhibition was inevitable. My hesitancy to work with WASM /
WebGL / WebGPU just made that take a while longer.

Without further ado, have a pair of links:

- [Link to shader playground web page](https://haihala.github.io/bevy-shader-testing)
  - Takes a while to load
  - May not work on mobile, sometimes requesting the desktop site helps
- [Link to shader playground github repo](https://github.com/haihala/bevy-shader-testing/)
  - Structure is relatively simple
    - Two rust files
      - `materials.rs` for setting up material types
      - `main.rs` for setup and controls
    - Shaders are in the `assets/shaders`

## How to use it

On the demo / user side I hope it's self explanatory. Use WASD or the
previous/next buttons to select which effect is highlighted on the right and
observe. It's not a game as much as it's a gallery.

On the dev side, if you're an aspiring graphics programmer and want to see how I
did something, you can follow the steps below:

- Count which effect you want to see the code of
- Grid order is spawn order in `main.rs` `setup`, use that to find the material type
- The material type contains a reference to the shader asset path
- Find shader code in `assets/<whatever it says in the material impl>`

Alternatively, try searching.

Minimal steps to get a custom shader visible in bevy:

- Add a shader file to `assets`, note the path
- Create a struct for the material. It has to derive:
  - `Asset`
  - `AsBindGroup`
  - `TypePath`
- Derive `Material` for your struct
  - In the `impl` -block, define the path to your shader code with either `fn fragment_shader` or `fn vertex_shader`
    - In most cases, you want `fragment_shader`, if you don't know the difference, this is like really key so do find out
- Add a plugin for the material
  - Specifically: `MaterialPlugin::<YourStructGoesHere>::default()`
- Create an instance of your material
  - For example: `let mat = YourStructGoesHere::new();`
- Register your material instance as an asset.
  - First in the parameters for your bevy system do `mut your_mats: ResMut<Assets<YourStructGoesHere>>`
  - Then create a handle with `let mat_handle = your_mats.add(mat)`
- Create a mesh asset for your shader
  - Very similar to the previous step
  - First in the parameters for your bevy system do `mut meshes: ResMut<Assets<Mesh>>`
  - Then create a handle with `let mesh_handle = meshes.add(Rectangle::default())`
    - This makes a 1-by-1 rectangle.
- Finally spawn it in
  - Many layers, I know, hopefully they streamline the process at some point
  - Example: `commands.spawn((Mesh3d(mesh_handle), MeshMaterial3d(mat_handle)))`

Put together, you can have something like this:

```rs
use bevy::{prelude::*, reflect::TypePath, render::render_resource::{AsBindGroup, ShaderRef}};

#[derive(Asset, TypePath, AsBindGroup, Debug)]
struct YourStructGoesHere {}
impl Material for YourStructGoesHere {
    fn fragment_shader() -> ShaderRef {
        "shaders/my_shader_asset.wgsl"
    }

    // This allows for transparency
    fn alpha_mode(&self) -> AlphaMode {
        AlphaMode::Blend
    }
}

fn main() {
    App::new()
        .add_plugins((
            DefaultPlugins,
            MaterialPlugin::<YourStructGoesHere>::default(),
        ))
        .add_systems(Startup, setup)
        .run();
}

fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut your_mats: ResMut<Assets<YourStructGoesHere>>,
) {
    // You need a camera to see anything in general
    commands.spawn((
        Camera3d::default(),
        Transform::from_xyz(0.0, 0.0, 3.0).looking_at(Vec3::ZERO, Vec3::Y),
    ));

    let mesh_handle = meshes.add(Rectangle::default());
    let mat_handle = your_mats.add(YourStructGoesHere {});

    commands.spawn((Mesh3d(mesh_handle), MeshMaterial3d(mat_handle)));
}
```

On the shader side the sky is the limit, but to just draw plain white, you could
do something like this:

```wgsl
#import bevy_pbr::forward_io::VertexOutput

@fragment
fn fragment(
    mesh: VertexOutput,
) -> @location(0) vec4<f32> {
    return vec4(1.0);
}
```

You can look at my shaders to get access to things like the current time
(essential for animating anything).

## Getting it to run on the web

So what I ended up doing:

- Tried to use (to no avail)
  - `bevy-cli`
  - `trunk`
  - `bevy` helper for building examples
- Final build process
  - Setup rust and bevy required packages in GH Actions as per usual
  - Setup a `web` folder with an `index.html` and a symbolic link to `assets` (so it sees the shaders)
  - Make a release build with `cargo`, specifically setting target to `wasm-unknown-unknown`
    - `cargo build --release --target wasm-unknown-unknown`
  - Use `wasm-bindgen` to generate bindings
    - `wasm-bindgen --out-name shader-testing --out-dir web/target --target web target/wasm32-unknown-unknown/release/bevy-shader-testing.wasm`
    - Name of the target comes from the crate name `bevy-shader-testing`
    - `web/target` is gitignored, `web/index.html` points to it
  - Upload `web` to GH pages

All and all, it's pretty simple now that it works. I did stumble to a few issues
along the way.

### Runtime-sized storage buffers

Two of the shaders use Bezier curves with a dynamic number of control points.
Not literally every amount is allowed, but there was a runtime sized array and
the amount of Bezier sections was calculated from the array size. I wanted the
splines to be continuous, so the last point of curve N is also the first point
of curve N+1. This translates to the following relation:

| Bezier sections | Control points |
| --------------- | -------------- |
| 1               | 4              |
| 2               | 7              |
| 3               | 10             |
| 4               | 13             |
| N               | 4+(N-1)\*3     |

This worked just fine for desktop environments, but apparently with WebGL, you
can't have runtime sized arrays. You maybe could with WebGPU, but the support is
still a work in progress and since I'm on linux none of my devices seem to
support it.

What I ended up doing is to just have a static sized array of 16 elements (4
curves). There are other reasons for this decision. In addition to that, I have
a separate uniform that gets passed in that tells the shader the amount of
segments. This works but I do think the previous solution was more elegant.

### Alignment

You may have been wondering why I would pick 16 elements, since that's too few
for five curves, but too many for four. You see, the reason is alignment. WebGL
demands that the uniform size is a multiple of 16 bytes. Each of the elements
within the array are either 3x4 or 4x4 bytes (either vec3 or vec4, aka three or
four four byte floating point values). The documentation was a bit confusing, so
I wanted to be sure and made the array length a multiple of four. 16 felt better
than 12, I doubt I'll ever even use 10.

This was a pain in the ass. I ended up spending so much time trying to figure
out which uniforms needed padding and the code is overall uglier for that. The
two tricks I used were grouping four four-byte values to a struct and adding
`#[repr(C, align(16))]` on it to enforce alignment. This worked fine for the one
case where I had that happen, but on all other cases it didn't take. Unpacking
the uniform on the shader side was a pain and didn't resolve the issues. Bevy /
gfx-rs / naga / whatever is responsible for this clusterfuck was too clever by
half and the only consistent solution I found for cases like a single float was
to use a `Vec4` on the `rust` side and `vec4f` on the `wgsl` side, and then just
use the x value. It's ugly. It's cumbersome. The whole thing took me several
hours to get done.

What really made annoying was the error messages. The message does mention which
group and which uniform is the problem, but leaves out which shader is the
issue, so in the end I ended up just commenting in and out code until I could
get it to run and then just iterate from there.
