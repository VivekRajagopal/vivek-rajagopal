# Dime for Time

I had a functional time-sheet written up in Excel that I use at work. It had a sprinkling of VBA scripting behind the scenes to make it even easier to use. But... this is not a story about settling for *functional*. In this blog post I'm going to briefly breakdown my attempt at creating a basic online Timesheet App, which is online at [timesheet.thinkingk.app](https://timesheet.thinkingk.app)!

## Which framework/stack?

I was gaining momentum learning ReactJS, but I needed a little more confidence before I could commit to it. I quickly prototyped a TimeInput entry field that would auto-format the users input into HH:MM format. I used [CodeSandbox](https://codesandbox.io) to prototype this [React Component](https://codesandbox.io/embed/k86yn204o). CodeSandbox is an amazing tool for fast and distributable prototyping.

The next question was how to handle user authentication and fetching user data. Google's [Firebase](https://firebase.google.com/) is a suite of Cloud services that takes care of few back-end requirements on most apps. It has a fairly easy to implement user authentication system. Fetching data from the database was slightly more complicated and took some trial and error to figure out a solution that worked.

## Working out a wireframe

Once I had a basic prototype of the timesheet, I sat down and worked out exactly how the app would load and what data would be required, when it would be fetched and how it would display within the React components. I mocked up an *app flow* outline that very simply described that path the app would take considering different availabilities of user authentication and data.

```
00 Entry → 01 Login Component
    
01 Login Component
    auth → 02 TimesheetApp
    !auth → 00 Entry
    
02 TimesheetApp.onComponentDidMount()
    03 setupListeners()
    
03 setupListeners()
    04 fetchUserDoc()
    05 fetchTimesheetDoc()

04 fetchUserDoc()
    exists → 06 setUserState()
    !exists → 07 setDefaultUserDoc()

05 fetchTimesheetDoc()
    exists → 08 setTimesheetState()
    !exists → 09 setTimesheetDoc()
```

Each function above was fleshed out with handling the fetch promises and setting the relevant component's state. 

## Controlled vs. Uncontrolled Components

One feature that I struggled to implement was to allow the user to view and edit previous timesheets. There were no issues fetching previous timesheet data from the database. The issue was that once the TimeInput fields had been initialised upon app load with current week timesheet data, I couldn't pass in new values as props. Through searching for a solution, I learnt about *Controlled* and *Uncontrolled* Components in ReactJS.

Uncontrolled components are used when the component can manage its own state. It may notify the parent of value changes through a prop function. For example, a simple toggle component that passes the toggle value via an onChange prop function or similar to the parent, **that does *not* need its value set by the parent** (apart from maybe the default value).

So while the TimeInputs were being initialised with this week's timesheet data, and could pass back values on change, they could not be overwritten with new values when a different week timesheet data was fetched by the user.

Controlled components on the other have their *state* managed by the parent. In the case of the TimeInput however, the value is in minutes from mid-night, but the time is displayed in HH:MM format. To over come this, the value and onChange handler is provided as a prop by the parent, while the component has its own *formattedVal* state value that is displayed in the input box. User interaction with the input box potentially modifies this state value, which is converted back into minutes from midnight, and then the onChange handler is called on this new value.

Since the value is passed as a prop, fetching a different timesheet (which sets the state/prop of the parent) flows down to the TimeInput component. It listends for ```static getDerivedStateFromProps(props, state)``` since it needs to update its state based on prop changes.

## Putting it all together

After the core of the app was complete, I added other features like user registration (which Firebase makes dead simple), and an About modal component. I also used Bitbucket's Pipelines system to automatically push the source to Heroku, and use the ```postinstall``` npm command to build and serve the app.