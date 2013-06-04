---
layout: page
title: "Favorite RubyMine Tips"
sharing: true
footer: true
date: 2013-05-03 17:57
comments: true
categories: [RubyMine, Vim]
keywords: RubyMine, RailsTutorial.org, Tips, Productivity, Rails, IdeaVim
published: true
description: Here's a video of my favorite RubyMine tips. 
---

<p>
Here's a video of my favorite RubyMine tips. I'll be updating this post shortly
with an improved version of this video, and details on the tips.
</p>
<p>
{% youtube LnN-JIxDRCg %}
</p>

<div id="outline-container-1" class="outline-2">
<h2 id="sec-1">Favorite things to show about RubyMine</h2>
<div class="outline-text-2" id="text-1">

<p>Here's my notes when making the video.
</p>
<ul>
<li>Goto Last Edit
  Quickly go to the last places you edited
</li>
<li>Git view of files and git aware of your changes
<ul>
<li>Next and previous diffs in file including view of the diff
</li>
<li>Excellent diffing tool that has full editing capability
</li>
<li>Commit dialog is absolutely fabulous
    Love how you can scroll through files and see diffs below, and even hit
    Cmd-D to go to diff screen to make little change.
</li>
<li>Annotate! see who last changed a line.
</li>
</ul>

</li>
<li>Go to
<ul>
<li>Definition (of method or even a CSS file)
</li>
<li>Method (ctrl-F12)
</li>
<li>File and then hit the same key (cmd-;) to search non-project files 
</li>
<li>Recent File
</li>
<li>Recent Edited Files
</li>
<li>filtering by wildcards!
</li>
<li>test file (and source file) (cmd shift t)
</li>
<li>related files (cmd-ctrl ; )
<ul>
<li>On the haml file, I hit cmd-ctrl ; and I can go instantly to the
      controller. This <b>ROCKS</b>.
</li>
</ul>

</li>
<li>Click on icon to left of method in controller and go to view, or get asked
    to create it!

</li>
</ul>

</li>
<li>Template expansion, such as 'desc' cmd-T
</li>
<li>Find box
<ul>
<li>incremental and highlights all matches
</li>
<li>amazing display of regexp matches and replaces
</li>
</ul>

</li>
<li>Context sensitive ruby doc and completion
</li>
<li>Find Usages of a method, variable, or class
</li>
<li>Refactoring, such as changing the name of a method
<ul>
<li>Renaming an ActiveRecord class even creates the database migration!
</li>
<li>Supports refactoring partials
</li>
</ul>

</li>
<li>Excellent syntax highlighting, with immediate error recognition
</li>
<li>Ability to use Vim or Emacs or TextMate or OS X key bindings, besides the old
  school IDE defaults, and the ability to customize the keystrokes, even with 2
  keystroke bindings (emacs style ctrl-x b)
<ul>
<li>Tooltips show you your customizations!
</li>
</ul>

</li>
<li>Switch from class to test (user.rb to user_spec.rb)
</li>
<li>Expand Selection by Context
</li>
<li>Find/Replace in Path
<ul>
<li>Can specify many different scopes including changed files, open files, etc.
</li>
<li>Super fast &ndash; easiest way to find specific code needed
</li>
<li>Example: Find sass import for "_foobar.scss" =&gt; search for regexp "import.*"
</li>
</ul>

</li>
<li>Rake db:migrate:redo displays a dropdown list of the migrations. Sweet!
</li>
<li>Intention settings! Hit Opt-Enter and get cool options!
<ul>
<li>Convert do block to {} and vice versa
</li>
<li>Convert js or ruby conditional to tertiary operator
</li>
</ul>

</li>
<li>Code inspections
<ul>
<li>Never had much luck with Java ones, but the Ruby ones Rock!
</li>
<li>Can easily "polish" code to a coding convention, such as consistent use of
    when and when not to use parentheses for if statements (only when doing
    assignment inside of an if statement)
</li>
</ul>

</li>
<li>Preferences
<ul>
<li>If you're using ideaVIM, it's a very good idea to see if you like the option
    "Editor&ndash;&gt;Refactorings&ndash;&gt;Enable in-place mode". You can hit the refactoring
    key quickly twice to get to the dialog way of typing in the variable.
    Personally, this way makes much more sense than the in-place editing.
</li>
</ul>

</li>
<li>Debugging
<ul>
<li>Easy configuration
</li>
<li>conditional debugging and break when another breakpoint is hit.
</li>
</ul>

</li>
</ul>


</div>

</div>

<div id="outline-container-2" class="outline-2">
<h2 id="sec-2">What didn't work for me</h2>
<div class="outline-text-2" id="text-2">

<ol>
<li>Running spork inside of RubyMine. Instead, I use Guard/Growl and be sure to
     use different ports and databases so as not to interfere with RubyMine Debugging.
</li>
</ol>


</div>

</div>

<div id="outline-container-3" class="outline-2">
<h2 id="sec-3">Topics</h2>
<div class="outline-text-2" id="text-3">

<ol>
<li>Using the Mac OS-X+ keymap for this screencast. I personally use Vim
     bindings. Brief overview of Rails Tutorial, which is where the code
     example comes from.  
</li>
<li>Goto File, Open up User Model (user.rb). Explain highlighting, beyond just syntax highlighting. user.rb
</li>
<li>Navigate &ndash;&gt; File Structure to directly access methods using Cmd-F12
</li>
<li>Goto File (user_spec), showing how to type u_s
</li>
<li>Goto Test, go back to main class (Cmd-Shift-T)
</li>
<li>Hide Project Window and other parts to get more screen real estate
</li>
<li>Hide Navigation Bar
</li>
<li>Split Screen (Right click tab)
</li>
<li>Move to opposite group (Right click tab)
</li>
<li>Move between panes (Ctrl-Tab), and shows the switcher if you hold
</li>
<li>Show how to fix mapping of switcher in preferences.
</li>
<li>Change Splitter Orientation (Right click tab)
</li>
<li>Run tests
<ol>
<li>All in file &ndash; right click at top and run (you can use the command to
         run all tests, but I never do that, as I just remember the context command)
</li>
<li>Specific Tests. Click on file to context, Ctrl-Shift-R
</li>
<li>Click on any context to run whichever tests you like.
</li>
</ol>

</li>
<li>Comment out <code>has_secure_password</code> in user.rb, using Cmd-/
</li>
<li>Re-run tests
</li>
<li>Show Errors
</li>
<li>Git Integration
<ol>
<li>Show how one can see what changed in Changes View, and do diff of user.rb
</li>
</ol>

</li>
<li>Show other file navigation and reasons to use them:
<ol>
<li>Instead of switcher, I use:
<ol>
<li>View &ndash;&gt; Recent Changed Files (Cmd-Shift-E)
</li>
<li>View &ndash;&gt; Recent Files (Cmd-E)
</li>
</ol>

</li>
<li>Often use Navigate &ndash;&gt; Last Edit Location (Cmd-Shift-Backspace)
</li>
</ol>

</li>
<li>Formatting
<ol>
<li>Select lines and tab/shift-tab
</li>
<li>Code &ndash;&gt; Reformat Code (Cmd-Opt-L)
<ol>
<li>You may want to only fix the lines you've already changed
</li>
<li>Show configuration dialog Code Style =&gt; Ruby
<ol>
<li>Mention "Align right parts of assignments or hashes" as
               something that may or may not be desirable
</li>
</ol>

</li>
</ol>

</li>
<li>Code &ndash;&gt; Auto Indent Lines (Ctrl-Opt-I)
<ol>
<li>Very useful to do this all the time
</li>
</ol>

</li>
</ol>

</li>
<li>Show failing tests in user_pages_spec.
<ol>
<li>Start application within RubyMine using toolbar
</li>
<li>Login to application as example@railstutorial.org/foobar
</li>
<li>Go to Users tab and show users are missing
</li>
</ol>

</li>
<li>
<p>
     Missing code in users/index.html:
</p></li>
</ol>


{% codeblock lang:ruby %}
     <ul class="users">
       <%= render @users %>
     </ul>
{% endcodeblock %}
<p>
     Show editor features of typing erb code.     
</p>

</div>

</div>

<div id="outline-container-4" class="outline-2">
<h2 id="sec-4">Keyboard shortcuts not in the video that I use all the time</h2>
<div class="outline-text-2" id="text-4">

<ul>
<li>Cmd-F12:  hide/show tool windows
</li>
<li>Vim: zz/Z top/bottom of page
</li>
<li>Running/debugging rake tasks (Ctrl-Opt-R)
</li>
<li>Goto definition! (Cmd-.)
</li>
<li>Example of using a vim macro to prepend a method call to several assignment
  statements.
</li>
<li>Find/replace that shows regexp evaluation results as they are developed
</li>
<li>To search replace end of line
<ul>
<li>match: \n
</li>
<li>replace: &lt;new text&gt;\n
</li>
</ul>

</li>
</ul>





</div>

</div>

<div id="outline-container-5" class="outline-2">
<h2 id="sec-5">Preferences</h2>
<div class="outline-text-2" id="text-5">

<p>Rubymine has an awesome configuration system. I was asked how to configure the
method separators.
</p>
<ol>
<li>To find a setting, type in a keyword. I typed in "method".
</li>
<li>Click on the matches. The matches for the keyword are highlighted.
</li>
</ol>


<p>
{% img /tips/rubymine-preferences-method-separators.png %}
</p></div>
</div>
