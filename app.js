const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type your note",
      },
      notes: [
        { title: "task 1", isUpdating: false },
        { title: "task 2", isUpdating: false },
        { title: "task 3", isUpdating: false },
      ],
      hello: "Hello",
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
    buttonName(note) {
      note.isUpdating ? "OK" : "Update";
    },
  },
  methods: {
    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },
    onSubmit() {
      if (this.input.value.trim()) {
        const newNote = {
          title: this.input.value.trim(),
          isUpdating: false,
        };
        this.notes.push(newNote);
      }
      //reset
      this.input.value = "";
    },
    remove(index) {
      this.notes.splice(index, 1);
      console.log(`note: ${index} has been removed`);
    },
    update(note) {
      console.log(note.title);
      note.isUpdating = !note.isUpdating;
    },
    updateNote(note, index) {
      this.notes[index].title = note.title.trim();
      note.isUpdating = !note.isUpdating;
    },
  },
};

Vue.createApp(App).mount("#app");
