---
title: 'What the git?'
tagline: 'Speedrun learning'
updatedAt: '2024-12-25T16:29+02:00'
tags: ['teaching']
favourite: true
draft: true
---

Git is a version management tool, which allows for wonderful things, like:

- Contributing to the same project with multiple people
- Backups
- Automatically releasing updates when something changes
- And many others

The point here is not to convince you to use git, but to tell you how to use
git. I would prefer to link to a post made by someone else, but most of them are
either unnecessarily verbose, or teach bad manners. I must thus once again amend
the world.

## Commits

With git, "commit" can be used as a noun (a commit) or a verb (to commit). To
commit means to create a commit. Everything in git revolves around commits, so
understanding them is key. I will give my definition of a commit in a quote to
make it pop from the page.

> A commit is an immutable, ideally minimalist and atomic **change**, that takes
> the project from one working state to a different one.

I've highlighted the word change there, because that is the key concept at play.
In fact the entirety of git is more or less just playing with a chain of changes
that build on each other.

Commits are immutable, which means they cannot be changed. After a commit has
been made, that commit will forever remain as is. This breeds skill issues, but
does mean that a commit hash (an identifier for the commit) will always
unambiguously translate to a specific version of the code. This is incredibly
useful in a lot of situations.

The rest of that plays into the part where I said some guides teach bad manners.
Newbies are often taught to commit a lot and commit often. This does build
understanding for the process, but leads to difficult scenarios when working in
teams with certain workflows. A commit should be minimalist, meaning it doesn't
contain anything not related to the core change at hand. If the core change is
to add a logout button to a web page, the changes should not contain editing the
front page layout. A commit should be atomic, meaning it contains everything
related to the core change at hand. If the core change is a new feature, that
entire feature should be in that commit (up to a reasonable point). I also
believe auxiliary things like tests and documentation should also be included in
the same commit. If not, they have a nasty habit of not happening at all.

And yeah, ideally a commit won't break anything.

Literally speaking, a commit consist of the following elements:

1. Changes in the project files
2. A plain text message
3. Automatically collected / generated stuff

### Changes

The changes are are the change we've been talking about. Sometimes git sees a
change differently than a human would, as it only understands that something got
added or removed from a place. Moving a line of code for example is often
interpreted as deleting it from the original position and adding a similar line
in the new place.

### Message

The message is just one or more lines of plain text. The first line is special,
as it's treated as a heading and some tools and views will only show that. The
rest of the message is called the body and can be used to further clarify why
something was done. Writing good commit messages is a skill that takes years to
master, but to get started you should keep the following things in mind:

- Mind the audience
  - Someone reading commit messages is probably fairly familiar with the project
  - They probably have access to the change, so don't rewrite that here
- Write what can't be seen from the change, for example the "why" questions
  - Why was this done this way?
  - Why was this done at all?
  - Why now?
  - Do try to keep it within the boundaries of reasonable.
- Keep it short and sweet
  - Often if you need to write "and", you have two commits in a trench coat.
  - Not always, it's fine to say the same change was done at multiple places
  - Examples:
    - Bad: Added the logout button and changed front page layout
    - Not bad: Updated logout and login button styles

### Automatics

Git automatically adds some info to the commit. It's important to know that it
happens, but the specifics don't necessarily matter yet.

Commits don't spawn from nothing, usually they are based on something. Before a
change was made, some version of the project existed. Git handles this by
designating each commit some number of "parent" commits. For the sake of ease of
use, it is usually best to try to keep the number of parents at one, meaning
each change happens on top of the previous one in a straight line. The first
commit has to have no parents and in some situations you can end up with a
commit with more than two parents (when merging two distinct versions the wrong
way)

It also adds metadata like who made the commit (based on git settings) and when
it was made (based on the time as of commit was made). When you first setup git
on your machine, you should tell git who you are. Usually, a name and an email
suffice. Won't go into detail, you can see this [GitHub
documentation](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git#setting-up-git) and it'll tell you how to do that.

All this is then hashed to produce a commit hash, which can be used as a unique
id for the commit and thus the version of the project.

## Why do I gotta learn all that?

Hopefully, with all that out of the way, we can blaze through the invocations
you will be casting. Understanding commits solves almost all git problems, so it
really is the core concept. Feel free to re-read that or ask me questions if
something is unclear. I will gladly edit this later to make it clearer.

There are plenty of terms git likes to use, I will try to pepper those in, so
you can maybe relate them to something and then troubleshoot problems that come
up.

I also understand that a lot of tools like editors and game engines have
built-in git integration that does most of the command invocations for you. This
has upsides and downsides. While it technically means you can use git by just
clicking on the "sync" button, I've found that these wrapper tools get
cumbersome to use when you want to do anything slightly unusual or when someone
else in the team has made some let's say _creative_ decisions and you need to
untangle the mess they've made. Understanding the process is more important than
remembering the commands. I still never remember which is ours and which is
theirs when rebasing.

The absolute shortest one person team git for dummies loop of operations goes
something like this:

- Make the change
- Run `git add .`
  - Note the dot
- Run `git commit -m "message here"`
  - Replacing "message here" with the message title
- Run `git push`
- Repeat from the beginning

Now to go over the commands, `git add` tells git to include the listed files in
the next commit. Git may say that the files selected are in the "staging area".
`git commit` then takes these files and packages them to a commit. The `-m` flag
on `git commit` stands for "message", and is an easy way to input the message.
If you don't put it there, git will open up a text editor for you to write the
message in. Sometimes this is `vim`, which is a notoriously difficult text
editor. You can save and exit `vim` by pressing escape, and then typing out
`:wq` and pressing enter. You can and probably should set the editor to
something else. Alternatively, get good. Finally `git push` takes this newly
created commit and yeets it into the remote repository, typically hosted in a
service like [GitHub](https://github.com/). This way if your machine blows up,
GitHub has your back and you can recover.

It requires some setup, but this will give you backups you can fall back on and
a version history you can look back on if need be. This is typically the
majority of what the "sync" buttons in editors do.

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
commit A as the remote repository base. Your buddy then get cracking. They make
and push commit B to the remote, all good so far. You then make commit C, but
when you try to push, git resists. You see, git notices that commit C was built
on top of commit A (it picks up on the parent commit when you made C).
Unfortunately, the topmost commit in the remote is no longer A. Pushing
carelessly here could break something, so git puts up a speed bump. What you
should do here, is update your local repository with `git pull --rebase`. Assuming
commits A and B don't overlap, it should produce a history like this:

![git conflict](/diagrams/git-conflict-rebased.svg)

You can now push your code. Short version: Pull before pushing.

Git can pull in several ways. Rebase is not the default, but it makes some
things simpler. You can do a rebase manually with `git rebase`, or with the pull
by passing the `--rebase` flag to `git pull`. You can and I recommend that you
do set pull to default to rebase with `git config --global pull.rebase true`.
After this, you can just do `git pull` and it automatically goes for the rebase.

## That's (almost) all folks

That's basically it. There are a bunch of other git things like branches and
tags, but you don't need those to get started. The mega-dense version is that a
tag is a label you put on a commit and a branch is a tag that moves when you
make a new commit on top of the branch commit. This means you can think of
branches as "channels". Typically a git repository has a main branch.

There are a few useful commands that may help along the way:

- `git status` will tell you useful info
  - Most importantly what you've added to the staging area
  - Sometimes you can get more info on why it broke work here
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

There are a bunch of useful tools, but those aren't relevant yet. As a rule of
thumb, if you've had a thing included in a commit, you can probably fish that
out somehow, even if you accidentally delete it.
