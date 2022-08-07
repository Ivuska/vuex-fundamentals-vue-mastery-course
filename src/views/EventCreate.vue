<template>
<h1>Create an event</h1>

<div class="form-container">

  <form @submit.prevent="onSubmit">
    <label>Select a category: </label>
    <select v-model="event.category">
      <option
        v-for="option in categories"
        :value="option"
        :key="option"
        :selected="option === event.category"
      >{{ option }}</option>
    </select>

    <h3>Name & describe your event</h3>

    <label>Title</label>
    <input
      v-model="event.title"
      type="text"
      placeholder="Title"
    >

    <label>Description</label>
    <input
      v-model="event.description"
      type="text"
      placeholder="Description"
    />

    <h3>Where is your event?</h3>

    <label>Location</label>
    <input
      v-model="event.location"
      type="text"
      placeholder="Location"
    />

    <h3>When is your event?</h3>
    <label>Date</label>
    <input
      v-model="event.date"
      type="text"
      placeholder="Date"
    />

    <label>Time</label>
    <input
      v-model="event.time"
      type="text"
      placeholder="Time"
    />

    <button type="submit">Submit</button>
  </form>

</div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data () {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
      }
    }
  },
  methods: {
    onSubmit() {
      // We store the data only when submitting the form.
      // These '...' is spread operator.
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.$store.state.user,
      }
      // Whenever we run the action, we dispatch it from the store. Former mutation is now an action in store/index.js.
      // Actions are better because of future-proof of the app and increases its scalability.
      this.$store.dispatch('createEvent', event)
        .then(() => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: event.id }
          })
        })
        .catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            // Error is fed into ErrorDisplay as a prop.
            params: { error:error }
          })
        })
    }
  }
}
</script>