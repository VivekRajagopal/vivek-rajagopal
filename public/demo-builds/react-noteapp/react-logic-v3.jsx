class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }

        this.submitNewNote = this.submitNewNote.bind(this);
    }

    submitNewNote() {
        this.props.addNote(this.state.value);
        this.setState({ value: "" });
    }

    render() {
        return (
            <div className="add-note-container">
                {/* <h3>Add Note:</h3> */}
                <form className="container-add-item" onSubmit={(e) => { e.preventDefault(); this.submitNewNote() }} >
                    <input
                        placeholder="Create a new note..."
                        type="text"
                        required
                        value={this.state.value}
                        onChange={(e) => this.setState({ value: e.target.value })}></input>
                    <button type="submit" className="btn btn-strong">
                    <i className="fa fa-plus"></i>
                    </button>
                </form>
            </div>
        )
    }
}

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: undefined,
            editing: false
        }
        this.labelChangeNotify = this.labelChangeNotify.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragLeave = this.dragLeave.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
    }

    //Notify MainApp of note label change
    labelChangeNotify(noteID, editValue) {
        this.setState({editing: false});
        this.props.modifyNote(noteID, editValue);
    }

    //Get source of drag operation
    dragStart(ev) {
        this.dragSource = Number(ev.currentTarget.dataset.id);
        this.setState({ dragging: this.dragSource });
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.mozCursor = 'grabbing';
        // Firefox requires calling dataTransfer.setData for the drag to properly work
        ev.dataTransfer.setData("text/html", null);
    }

    //Resort item array to insert dragSource into dragOverTarget
    dragOver(ev) {
        ev.preventDefault();
        const items = [...this.props.list.entries()].map((entry)=>{return entry[0]});   //Get array of note IDs                
        let dragTarget = Number(ev.currentTarget.dataset.id);   //ID of note being dragged over
        if (dragTarget == this.dragSource) return;              //Exit if reorder not required
        
        //Reposition 
        let iDragSource = items.indexOf(this.dragSource);
        let iDragTarget = items.indexOf(dragTarget);
        let dtItem = items.splice(iDragSource, 1)[0];   //Remove dragTarget item
        items.splice(iDragTarget, 0, dtItem);    //Insert dt at dropTarget location
        
        this.setState({ dragging: dragTarget });
        this.props.reorderNotes(items);
    }

    dragLeave(ev) {
        //ev.preventDefault();
        this.setState({ dragging: undefined })
    }

    dragEnd(ev) {
        //ev.preventDefault();
        this.setState({ dragging: undefined })
    }

    renderNoteItem(noteName, noteID) {
        ///const style = (noteID === this.state.dragSource) ? "note-item-container note-item-droptarget" : "note-item-container";
        return (
            <div className="note-item-container"
                data-id={noteID}
                key={noteID}                
                draggable ={!this.state.editing}
                onDragStart={this.dragStart}
                onDragOver={this.dragOver}
                onDragLeave={this.dragLeave}
                onDragEnd={this.dragEnd}
                onBlur={this.dragEnd}
            >   
                <EditableLabel 
                    value={noteName} 
                    id={noteID} 
                    editNotify={(edit)=>this.setState({editing: edit})}
                    changeNotify={this.labelChangeNotify}/>
                <button className="btn btn-delete"
                    onClick={(e) => this.props.deleteNote(noteID)}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        )
    }

    render() {
        let noteElems = [];
        this.props.list.forEach((val, key)=>{
            noteElems.push(this.renderNoteItem(val, key))
        })

        if (noteElems.length == 0) noteElems.push(<div key={0} className="note-list-noitems">Add some notes to get started!</div>)

        return (
            <div className="note-list-container">
                {noteElems}
            </div>
        );
    }
}

class EditableLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            editing: false,
            savedValue: this.props.value,
            editValue: this.props.value     //Temporary value displayed to user when editing label
        }
    }

    componentDidUpdate() {
        if (this.inputElem)
            this.inputElem.focus();
    }

    edit = () => {
        this.setState({editing: true});
        this.props.editNotify(true);
    }

    cancel = () => {
        this.setState({editing: false});
        this.setState({editValue: this.state.savedValue});
        this.props.editNotify(false);
        console.log(`Note ID:${this.props.id} edit cancelled`)
    }

    //Commits the text-input value to the note label value
    save = () => {
        this.setState({editing: false});
        this.props.editNotify(false);
        if (this.state.editValue == this.state.savedValue || this.state.editValue == "") this.cancel();
        else {
            this.setState({savedValue: this.state.editValue});
            this.props.changeNotify(this.props.id, this.state.editValue);
        }        
    }

    keyHandle = (ev) => {
        switch (ev.key) {
            case 'Enter':
                this.save();
                break;
            case 'Escape':
                this.cancel();
                break;
        }
    }

    render() {
        let labelElem = <label 
            className="label-editable"
            onClick={this.edit}>{this.state.editValue}</label>

        let inputElem = <input 
            type="text"
            value={this.state.editValue}
            onChange={(e)=>{this.setState({editValue: e.target.value})}}
            onBlur={this.save}
            onKeyDown={this.keyHandle}
            ref={(i)=>{this.inputElem=i}}></input>

        let renderedElem = labelElem;
        if (this.state.editing) renderedElem = inputElem

        return (
            renderedElem
        )
    }
}

class MainApp extends React.Component {
    constructor() {
        super();

        let LSItems = JSON.parse(window.localStorage.getItem("listItems"));        

        if (!LSItems || LSItems === {}) LSItems = [
            [0, "Hello"],
            [1, "World"],
            [2, "Do dishes...?"]
        ];

        this.state = {
            list: new Map(LSItems)
        }

        this.addNoteHandle = this.addNoteHandle.bind(this);
        this.deleteNoteHandle = this.deleteNoteHandle.bind(this);
        this.modifyNoteHandle = this.modifyNoteHandle.bind(this);
        this.reorderNotesHandle = this.reorderNotesHandle.bind(this);
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    }

    addNoteHandle(noteName) {
        let id = Date.now();
        this.state.list.set(id, noteName);
        this.setState(this.state.list);

        this.saveToLocalStorage();
    }

    deleteNoteHandle(noteID)  {  
        this.state.list.delete(noteID)
        this.setState({ list: this.state.list });
        this.saveToLocalStorage();
    }

    modifyNoteHandle(noteID, newVal) {
        this.state.list.set(noteID, newVal);
        this.saveToLocalStorage();
    }

    reorderNotesHandle(IDList) {
        let newEntries = [];
        IDList.forEach((val) => {newEntries.push([val, this.state.list.get(val)])});
        this.setState({list: new Map(newEntries)});
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        window.localStorage.setItem("listItems", JSON.stringify([...this.state.list.entries()]));
    }

    render() {
        return (
            <div className="app-container">
                <h1>React Notes</h1>
                {
                    /* <button className="btn" onClick={()=>{console.log(this.state.list)}}>LOG</button>
                    <button className="btn" onClick={()=>{console.log(window.localStorage.getItem("listItems"))}}>Local Store</button> */
                }
                <p>This is a simple note taking / todo app built with ReactJS. Create notes to start using. You can reorder and delete notes as you wish.</p>
                <AddNote addNote={this.addNoteHandle}/>
                <ItemList list={this.state.list} deleteNote={this.deleteNoteHandle} reorderNotes={this.reorderNotesHandle} modifyNote={this.modifyNoteHandle}/>
                {
                    /* <EditableLabel value="Hello world" id={Date.now()} editNotify={()=>{console.log('Edit notification')}} changeNotify={(id, val)=>{console.log(`Note ID:${id} edited to ${val}`)}}/> */
                }
            </div>
        );
    }
}

ReactDOM.render(
    <MainApp />,
    document.getElementById('root')
);
