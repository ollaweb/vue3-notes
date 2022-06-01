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
        },
        {
          title: "Example of your note #2",
          isUpdating: false,
          isDone: false,
        },
        {
          title: "Example of your note #3",
          isUpdating: false,
          isDone: false,
        },
      ],
      isDoneHidden: false,
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
    tasksToDo() {
      return this.notes.filter((note) => !note.isDone);
    },
    doneTasks() {
      return this.notes.length - this.tasksToDo.length;
    },
    hasDoneTasks() {
      if (this.doneTasks === 0) {
        return true;
      } else {
        return false;
      }
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
        };
        this.notes.push(newNote);
        console.log(this.hasDoneTasks);
      } else {
        console.log("You can't enter blank note");
      }

      //reset
      this.input.value = "";
    },
    handleDestroy(index) {
      this.notes.splice(index, 1);
    },
    handleDestroyDone() {
      this.notes.forEach((item, index, array) => {
        if (item.isDone) {
          array.splice(index, 1);
        }
        item;
      });
    },
    handleDestroyAll() {
      this.notes = [];
    },
    handleUpdate(note) {
      note.isUpdating = !note.isUpdating;
    },
    handleUpdateNote(note, index) {
      if (note.title.trim()) {
        this.notes[index].title = note.title.trim();
        note.isUpdating = !note.isUpdating;
      } else {
        console.log("You can't enter blank note");
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
