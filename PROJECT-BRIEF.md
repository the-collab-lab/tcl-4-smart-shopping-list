# Project Brief, The Collab Lab

## Smart Shopping List

### Overview

The goal of this project is to work together to build a “smart” shopping list that learns your shopping habits over time, putting items you are most likely to need to buy in the near future at the top.

This project is based on [iNeedToBuy.xyz](https://app.ineedtobuy.xyz/), a mobile web app I built for my own use last year. You’re welcome to look at the [GitHub repo for that site](https://github.com/segdeha/ineedtobuy.xyz) if you get stuck and want a hint!

### Locations for things

* Site: [https://tcl-4-smart-shopping-list.web.app](https://tcl-4-smart-shopping-list.web.app)
* Repo: [https://github.com/the-collab-lab/tcl-4-smart-shopping-list](https://github.com/the-collab-lab/tcl-4-smart-shopping-list)
* Clone URL: `git@github.com:the-collab-lab/tcl-4-smart-shopping-list.git`
* Issues list: [https://github.com/the-collab-lab/tcl-4-smart-shopping-list/projects/1](https://github.com/the-collab-lab/tcl-4-smart-shopping-list/projects/1)
* Database: [https://console.firebase.google.com/u/1/project/tcl-4-smart-shopping-list/database/firestore/data~2F](https://console.firebase.google.com/u/1/project/tcl-4-smart-shopping-list/database/firestore/data~2F)

### Project cadence & duration

The project is expected to take 40 hours per participant, spread over 8 weeks.

Each week, the team of 4 developers will split into 2 pairs of 2 developers each. Each pair will take on a story or task from the issues list to work on together that week.

Pairings will go as follows:

#### Week 1, January 27 – February 2

1. Rachael & Matthew
2. Jaela & Haley

#### Week 2, February 3 - February 9

1. Haley & Rachael
2. Matthew & Jaela

#### Week 3, February 10 - February 16

1. Jaela & Rachael
2. Haley & Matthew

#### Week 4, February 17 - February 23

1. Rachael & Matthew
2. Jaela & Haley

#### Week 5, February 24 - March 1

1. Haley & Rachael
2. Matthew & Jaela

#### Week 6, March 2 - March 8

1. Jaela & Rachael
2. Haley & Matthew

#### Week 7, March 9 - March 15

1. Rachael & Matthew
2. Jaela & Haley

#### Week 8, March 16 - March 22

1. Haley & Rachael
2. Matthew & Jaela

### Pair Programming

A portion of your dedicated hours each week will be spent [pair programming](https://www.freecodecamp.org/news/how-remote-pair-programming-works-and-why-it-can-change-your-life-cd7b767dc60f/) with your partner — this is where the most magical collaboration happens.

Pair programming offers some really exciting opportunities to teach/learn from your partner, get a different perspective and/or insight on the issues you’re facing, and drive forward progress on your goals.

There is no one “right” way to pair program, but in general, you will meet with your partner on Zoom to work through the story or task you’ve chosen for that week. You’re encouraged to test out some different approaches to pair programming to see what works best for your and your partner’s collaboration styles.

### Weekly Sync

Each week, we’ll get on a 1-hour Zoom call. The call will always start with a *quick demo of the previous week’s work* from each pair. This is a common practice on most software teams and also lets you practice talking about your work, which can come in handy in a job interview setting!

The way we use the rest of the time will vary based on whether it’s an even- or odd-numbered week, as follows:

#### Odd-numbered weeks

1. Demos/discussion (15 minutes)
2. Learning module (30 minutes)
3. Mentors meet with pairs to talk through approach to upcoming week’s work (15 minutes)

#### Even-numbered weeks

1. Demos/discussion (15 minutes)
2. Retrospective (30 minutes)
3. Mentors meet with pairs to talk through approach to upcoming week’s work (15 minutes)

In our retros, we will share appreciations of our teammates as well as talk about what went well from a process perspective and what we could do to improve how we’re working together.

### How to know what to do

The project is organized in GitHub as a set of [user stories](https://www.mountaingoatsoftware.com/agile/user-stories), each with a description of the desired functionality as well as [acceptance criteria](https://www.leadingagile.com/2014/09/acceptance-criteria/) (AC) that describe how you know whether the task or story is complete. You can find the stories on [the project board](https://github.com/the-collab-lab/tcl-4-smart-shopping-list/projects/1) on GitHub.

A task or story is “done” when the following are all true:

* The AC have been met
* Tests have been written to validate the “[happy path](https://en.wikipedia.org/wiki/Happy_path)”
* In the case of a UI feature, it has been reviewed for [accessibility](https://accessibilityinsights.io/)
* The code to complete the task or implement the feature has been reviewed and approved by the other pair of developers
* The [Product Owner](https://www.agilealliance.org/glossary/product-owner/) (i.e. Andrew or 1 of the mentors) has accepted the work as satisfactorily meeting the requirements

The “backlog” (the collection of stories) represents the work needed to complete the project. At the point when all of the stories are done, we should have a working app!

### Coordination & communication

At the start of each week, each pair will create a page on [the project wiki](https://github.com/the-collab-lab/tcl-2-smart-shopping-list/wiki) where you can coordinate your approach to solving your problem for the week, surface blockers and learnings, etc. One of the benefits of this is that the people reviewing your work can better understand your process for how you got to your solution.

### Development process

Work will be done on feature branches in git. Branches should be named in the following way:

	<initials of person 1>-<initials of person 2>-<short description>

For example:

	stc-an-connect-to-firestore

The hypothetical example above has Stacie Taylor-Cima and Alejandro Ñáñez working together on connecting the app to Firestore. Each of them will be able to work on the feature branch independently, but only one of them will submit the merge request when the work is ready (described in more detail below).

When you’re ready to start work on a feature, one person in your pair should create a local branch following the naming convention above, then push the branch to GitHub so your pair buddy can pull it down to their local environment. The following steps should work to do just this:

	git checkout -b an-example-feature-branch
	git push -u origin an-example-feature-branch

When you and your pair partner have working code that you believe is ready to be merged to `master` and deployed, you will follow the following steps:

1. Create a “[pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)” (PR).
2. Notify the other pair team in Slack that you have a new PR for them to review.
3. Incorporate feedback from the other pair team into your work until both you and they are satisfied the code is ready to be merged.
4. Request that Andrew or one of the mentors review the PR for final approval.
5. Once approved, merge the PR into `master`. (Your code will be built and deployed to production automatically thanks to [Netlify](https://www.netlify.com/).)
6. Check your work on the [production site](https://tcl-4-smart-shopping-list.netlify.com/).
7. Celebrate! 🥳

### What else?

It’s highly likely something about the above is not clear, so please be noisy on Slack as things come up. The mentors and I will do our best to get you unstuck. Also, lean on each other for help as well! Finally, work in the open so everyone can benefit from your questions.

![gif of a My Little Pony pulling on goggles, with a determined look on their face, saying, “Let’s do this”.](http://giphygifs.s3.amazonaws.com/media/PuWNMebKGIKNG/giphy.gif)