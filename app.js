const App = {
    data() {
        return {
            title: "Notes",
            input: {
                value: "",
                placeholder: "Type your note",
            },
            notes: ["task 1", "task 2", "task 3"],
            updating: false,
        }
    },
    computed: {
        updateButton() {
            return this.updating ? "Ok" : "Update";
        }
    },
    mounted() {
        this.getNotes();
    },
    watch: {
        notes: {
            handler(updatedList) {
                localStorage.setItem("notes", JSON.stringify(updatedList))
            },
            deep: true,
        }
    },
    methods: {
        getNotes() {
            const localNotes = localStorage.getItem("notes");
            if (localNotes) {
                this.notes = JSON.parse(localNotes);
            }
        },
        onSubmit() {
            this.notes.push(this.input.value);

            //reset
            this.input.value = "";
        },
        remove(index) {
            this.notes.splice(index, 1);
            console.log(`note: ${index} has been removed`)
        },
        update() {
            this.updating = !this.updating;
        },
        onUpdate(e) {
            const updatedNoteValue = e.target.value;
            this.notes[this.index] = updatedNoteValue;
            console.log(updatedNoteValue);
            console.log(this.index);
            console.log(this.notes);
        }

    },
}

Vue.createApp(App).mount("#app");