# Todo App made with [insert framework]

Todo app tutorials are everywhere! They're a nice starting point in trying to learn the basics of a particular framework or language. It combines user input and state and view management - and you make something *useful!*

So of course... I needed to make [my own](/demo-builds/react-noteapp/index.html)!

## Something useful

I deviated slightly from making a 'todo' app, to making a 'note taking' app. Kind of a like a very light version of [Trello](https://trello.com). I like Trello and use it frequently to plan out my projects and break them down into set features or tasks. But sometimes I think its too rigid in its representation of tasks and task lists. I wanted to view my tasks in a timeline, or as a Gantt chart... and yes there are other apps out there that do this and they come with more time investment required by the user.

## The Features

For some reason I really wanted drag-and-drop (like Trello does). Being able to freely and easily reorder tasks, or *notes* in this case, gives the app a layer of interactivity and becomes more of a virtual representation of its analog counterpart. So this was the initial feature list;

1. Create notes through a simple text input form
2. Delete notes
3. Complete (or scratch out) notes
4. Reorder notes by drag and drop
5. Save notes to the browser's Local Storage

With these features I could mostly replace note taking by hand. The idea was to use this at work to keep track of where each project or little task was at - and have it all accessible in one place. And so, it would hopefully be a worthwhile app to make and use.

## The Tricky Part

Features 1 to 3 were fairly easy to implement. The main app stores the list of notes in its state, and child components have reference to this state via props, including functions to modify the state. This was the final outline of the app components;

    App
        CreateNote
        list of NoteItem

Yep.

But what about drag-and-drop 👻??

That took a little research into the HTML 5 Drag-And-Drop API to get working. When each `NoteItem` detects that its being dragged (`onDragStart` event) it sets the `event.dataTransfer` object with the id of the note. Each `NoteItem` also has a prop callback to notify the parent that it is being dragged, and also if its being dragged over. This was it can notify the parent of the `NoteItem` being dragged, and the intended drag target.

Then the parent `App` reorders the list of notes in its state. Any changes are saved to Local Storage.

And that's it! 🙌

I found working on this fairly comfortable after taking on my [Dime-for-Time](/blog/dime-for-time) Timesheet App project. Not just in using React, but also styling with CSS - its all just flexboxes 😛. I'd also like to use [Firebase](https://firebase.google.com) again to allow users to have their notes saved online.

## Future Planned Features
1. Save notes online
2. Search feature
3. Toggle view between notes and list
4. Multiple Note Boards... (might go back to using Trello at this point)

Thanks for reading 🙂 - check out the [demo](/demo-builds/react-noteapp/index.html)