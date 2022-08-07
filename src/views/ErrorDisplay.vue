<template>
<h4>Ooops! There was an error:
    <p>{{ error }} </p>
</h4>
</template>

<script>
export default {
    props: ['error']
}
</script>