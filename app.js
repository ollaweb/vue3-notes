const App = {
  data() {
    return {
      title: "ToDo List",
      subtitle: "add, edit or delete your tasks",
      input: {
        value: "",
        placeholder: "Type your task",
      },
      notes: [
        {
          title: "Example of your note #1",
          isUpdating: false,
          isDone: false,
          hasError: false,
        },
        {
          title: "Example of your note #2",
          isUpdating: false,
          isDone: false,
          hasError: false,
        },
        {
          title: "Example of your note #3",
          isUpdating: false,
          isDone: true,
          hasError: false,
        },
      ],
      isDoneHidden: false,
      lastValueOfNote: "",
      errorMessage: "You can't enter blank note",
    };
  },
  mounted() {
    this.getNotes();
  },
  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem("notes", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },
  computed: {
    amountOfTasksToDo() {
      return this.notes.filter((note) => !note.isDone).length;
    },
    amountOfDoneTasks() {
      return this.notes.length - this.amountOfTasksToDo;
    },
    notesFiltered() {
      if (this.isDoneHidden) {
        return this.notes.filter((note) => !note.isDone);
      } else {
        return this.notes;
      }
    },
  },
  methods: {
    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes && localNotes.length !== 2) {
        this.notes = JSON.parse(localNotes);
      }
    },
    handleStore() {
      if (this.input.value.trim()) {
        const newNote = {
          title: this.input.value.trim(),
          isUpdating: false,
          isDone: false,
          hasError: false,
        };
        this.notes.push(newNote);
      }

      //reset
      this.input.value = "";
    },
    handleDestroy(index) {
      this.notes.splice(index, 1);
    },
    handleDestroyDone() {
      const notesToDo = this.notes.filter((note) => !note.isDone);
      this.notes = notesToDo;
    },
    handleDestroyAll() {
      this.notes = [];
    },
    handleUpdate(note) {
      note.isUpdating = !note.isUpdating;
      this.lastValueOfNote = note.title;
    },
    showError(message) {
      this.errorMessage = message;
    },
    handleUpdateNote(note, index) {
      if (note.title.trim()) {
        this.notes[index].title = note.title.trim();
        note.isUpdating = !note.isUpdating;
        this.lastValueOfNote = "";
      } else {
        this.notes[index].title = this.lastValueOfNote;
        note.isUpdating = !note.isUpdating;
        note.hasError = !note.hasError;
        setTimeout(() => {
          note.hasError = !note.hasError;
        }, 2000);
      }
    },
    handleDone(note) {
      note.isDone = !note.isDone;
    },
    handleHideDone() {
      this.isDoneHidden = !this.isDoneHidden;
    },
    handleShowDone() {
      this.isDoneHidden = !this.isDoneHidden;
    },
  },
};

Vue.createApp(App).mount("#app");
