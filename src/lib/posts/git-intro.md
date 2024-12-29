---
title: 'What the git?'
tagline: 'Speedrun learning'
updatedAt: '2024-12-29T13:40+02:00'
tags: ['teaching']
favourite: true
draft: false
---

Git is a version management tool, which allows for wonderful things, like:

- Contributing to the same project with multiple people
- Backups
- Automatically releasing updates when something changes
- And many others

I won't convince you to use git. Hopefully I can tell you how to use git. I
would prefer to link to a post made by someone else, but most of them are either
unnecessarily verbose, or teach bad manners. Alas, I must amend the world.

This is not a complete guide, but a starting point. There are lots of opinions
out there on how git should be used, but unlike mine they are all incorrect.

## Commits

With git, "commit" can be used as a noun (a commit) or a verb (to commit). To
commit(verb) means to create a commit(noun). Everything in git revolves around
commits, so understanding them is key. In short:

> A commit is an immutable, ideally atomic and minimalist **change**, that takes
> the project from one working state to a different one.

I've highlighted the word change there, because that is the key concept at play.
Git is more or less just playing with of changes based off of each other.

Commits are immutable, which means they cannot be changed. After a commit has
been made, that commit will forever remain as is. This breeds skill issues, but
does mean that a commit hash (an identifier for the commit) will always
unambiguously translate to a specific version, which can be incredibly useful.
This is not to say that nothing can be done after a commit has been made, just
that you don't really edit commits as much as you generate new ones.

The rest of that plays into the part where I said some guides teach bad manners.
Newbies are often taught to commit a lot and commit often. This does build
understanding for the process, but often leads to problems in teams. A commit
should be minimalist, meaning it doesn't contain anything not related to the
core change at hand. If the core change is to add a logout button to a web page,
the changes should not contain editing the front page layout. A commit should be
atomic, meaning it contains everything related to the core change. If the core
change is a new feature, that entire feature should be in that commit (the
definition of "feature" here is flexible and may not map 1:1 to what the manager
views as a feature). Auxiliary things like tests and documentation should be
included in the same commit. If not, they have a nasty habit of not happening at
all.

And yeah, ideally a commit won't break anything.

Literally speaking, a commit consist of the following elements:

1. Changes in the project files
2. A message
3. Automatically collected information

### Changes

The changes are are the change we've been talking about. Sometimes git sees a
change differently than a human would, as it only understands that something got
added or removed from a place. Moving a line of code for example is interpreted
as deleting it from the original position and adding a completely new but
similar line in the new place.

### Message

The message is just one or more lines of plain text. The first line is special,
as it's treated as a title and some tools will only show that. The rest of the
message is called the body and can be used to further clarify things. Writing
good commit messages is a skill that takes years to master, but to get started
you should keep the following things in mind:

- Mind the audience
  - Someone reading commit messages is probably fairly familiar with the project
  - They probably have access to the file changes, so don't rewrite that here
- Write what can't be seen from the change. "why" questions are good
  - Why was this done this way?
  - Why was this done at all?
  - Why now?
- Keep it short
  - A title should fit in a tweet, preferable half a tweet
    - You often don't need the body
  - **Quality over quantity**
  - If you need to write "and", you often have two commits in a trench coat.
    - Not always, it's fine to say the same change was done at multiple places
  - Examples:
    - Bad: Added the logout button and changed front page layout
    - Acceptable: Updated logout and login button styles
    - Good:
      - Title: Updated logout and login button styles
      - Body: Brian wanted a new design. See ticket #123 for details.

### Automatics

Git automatically adds details to the commit when it's made. It's important to
know that it happens, but the specifics don't necessarily matter.

Changes are usually are built on top of a previous version of the project. Git
handles this by designating each commit "parent" commits. It is usually best to
try to keep the number of parents at one, meaning each change happens on top of
the previous one in an unambiguous lineage. The first commit can't have a
parent, and in some situations you can end up with a commit with more than one
parent, but we'll try to avoid that.

Git also adds metadata like who made the commit and when it was made. When you
first setup git on your machine, you should tell git who you are (Name and
email). I won't go into detail, you can see this [GitHub
documentation](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git#setting-up-git)
and it'll tell you how to do that. The values can be whatever, but lots of
services like GitHub use the email to link you to an account.

The change, the message and all the metadata is then hashed to produce a commit
hash, which can be used as a unique id for the commit.

## Why do I gotta learn all that?

Understanding commits is like 80% of understanding git. This makes understanding
the invocations easier. Feel free to re-read that or ask me questions if
something is unclear. I will gladly edit this later to make it clearer. We're
all dumb sometimes, but we only remain dumb by not asking questions.

There are plenty of terms git likes to use, I will try to pepper those in, so
you can maybe relate them to something and then troubleshoot problems that come
up.

I also understand that a lot of tools like IDEs, editors and game engines have
git integrations that do most of the command invocations for you. This is a
double-edged sword. While it means you can use git by just clicking on the
"sync" button, I've found that these wrappers get cumbersome when you want to do
anything slightly unusual or when someone else in the team has made some let's
say _creative_ decisions and you need to untangle the mess they've made.
Understanding the process is more important than remembering the commands, and
relying on a wrapper often leads to ritualistic behavior and a lack in
problem-solving skills.

The absolute shortest one person git for dummies loop goes something like this:

- Make the change
- Run `git add .`
  - All of the commands assume you are in the root of the project
  - Note the dot
- Run `git commit -m "message here"`
  - Replacing the text in quotes with the message title
- Run `git push`
- Repeat from the beginning

Now to go over the commands, `git add` tells git to include the listed files in
the next commit. Git says that the added files are in the "staging area". `git
commit` then takes these files and packages them to a commit. The `-m` flag on
`git commit` stands for "message", and is an easy way to input the message. If
you don't put it there, git will open up a text editor. Sometimes this is the
infamously difficult `vim` (insert ominous thunder). You can and probably should
set the editor to something else. Either that or get good. Finally `git push`
takes this newly created commit and uploads it into the remote repository,
typically hosted in a service like [GitHub](https://github.com/). This way if
your machine blows up, GitHub has your back and you can recover.

This will give you backups you can fall back on and a version history you can
look back on if need be. Typically this is most of what the "sync" buttons in
git wrappers do.

### Oh bother! Other people

I mentioned the term "remote repository" in the previous chapter. To understand
the problems that arise when working with more people, it's important to
understand repositories. In the simplest of terms, a repository is a container
of commits. You have a local one on your machine and when you run `git commit`,
a new commit is added to it. `git push` then takes these local repository
commits and sends them over to a remote repository, for example in GitHub.

A potential problem looks like this:

![git conflict](/diagrams/git-conflict.svg)

Say you are working with a buddy, you both start off in the same state with
commit A as the remote repository base. Your buddy made and pushed commit B to
the remote, all good so far. You then make commit C, but when you try to push,
git resists. You see, git notices that commit C was built on top of commit A,
and that the topmost commit in the remote is no longer A. Pushing here could
break something, so git puts up a speed bump. What you should do here, is update
your local repository with `git pull --rebase`. Assuming commits A and B don't
overlap, it should produce a history like this:

![git conflict](/diagrams/git-conflict-rebased.svg)

You can now push your code. Short version: Pull before pushing. Typically the
git wrappers also do this, making the "sync" button typically do add + commit +
pull + push in that order.

Git can pull in several ways. Rebase is not the default, but it makes some
things simpler. You can do a rebase manually with `git rebase`, or with the pull
by passing the `--rebase` flag to `git pull`. You can and I recommend that you
do set pull to default to rebase with `git config --global pull.rebase true`.
After this, you can just do `git pull` and it automatically goes for the rebase.

If you and your buddy made changes to the same lines, sometimes git can't deduce
which of them should be kept. Frankly it's a miracle that it sometimes can
deduce this, but I digress. This scenario is what we call a conflict. When
working with rebases, the conflict fix process is relatively simple:

- Open the listed files
- Edit the marked areas
  - Git uses markers with `>>>>>>,` `======,` or `<<<<<` to indicate which
    chunks of code conflict.
  - Some tools will color the conflicting areas
- Delete the markers
- Run `git add .`
- Run `git rebase --continue`

## That's (almost) all folks

That's basically it. There are a bunch of other git things like branches and
tags, but you don't need those to get started. The mega-dense version is that a
tag is a label attached to a commit and a branch is a tag that moves when you
make a new commit on top of the branch commit. This means you can think of
branches as "channels". Typically a git repository has a main branch.

There are a few useful commands that may help along the way:

- `git clone` will download a repository and initialize the git internal stuff
- `git status` will tell you useful info, including but not limited to:
  - List of changes from the previous commit
    - Which of those you've added to the staging area
  - Which files have conflicts in them
- `git diff` lets you compare two versions
  - By default it compares your unstaged changes to the most recent commit
  - You can do `git diff A B` and compare A and B. A and B can be:
    - Branches
    - Tags
    - Commit hashes
- `git reset` will undo stuff
  - By itself it removes everything from the staging area (undoes `git add`)
  - If you add `--hard`, it reverts the project state to the previous commit
- `git switch` lets you switch between branches. Useful later on.
- `git commit --amend` lets you recreate the previous commit
  - If you added more stuff to the staging area, those will get folded in
  - You can edit the message again (probably in `vim`)

Hope this helps you get started. You can find my contact details [here](/about)
if you need to get in contact.

## Amendments

The main post is about what it was when I originally posted it.

### Diff3

By default, git uses a two part diff system when showing conflicts. If you're
rebasing, it shows what you did and what the other half did that caused the
conflict. By using diff3 (or zdiff3), you also get the base version. When doing
the example rebase from above, with the default settings you would get the
changes from commits B and C, but with diff3 you also get to see A.

Useful links:

- https://stackoverflow.com/questions/27417656/should-diff3-be-default-conflictstyle-on-git
- https://www.ductile.systems/zdiff3/

### `git add -p`

I use a bunch of git plugins for my neovim config, including
[gitsigns](https://github.com/lewis6991/gitsigns.nvim), which has a feature to
stage individual patches / hunks (consequent lines of changes) of a file,
instead of adding the whole file. I know popular editors like VSCode also has a
feature like this. If you want, you can use `git add -p` or `git add --patch` to
interactively loop through all the patches and choose which ones to stage.
Helpful when you realize you've crossed over to the next task at some point on
accident and want to make it into two commits.
