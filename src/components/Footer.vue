<template>
    <footer class="footer">
        <ul class="list-reset text-xl">
            <li>
                <a href="https://www.t.me/kyalo_vincent" target="_blank">
                    <font-awesome-icon :icon="['fab', 'telegram']" size="2x"></font-awesome-icon>
                </a>
            </li>

            <li>
                <a href="https://www.instagram.com/kyalo_vincent" target="_blank">
                    <font-awesome-icon :icon="['fab', 'instagram']" size="2x"></font-awesome-icon>
                </a>
            </li>
        </ul>

        <p>&copy; {{ new Date().getFullYear() }} <a href="mailto:kyalovincent@yahoo.com" style="color: #E4852E">KSprings</a>. Designed & Developed by <a
                href="https://about.me/kyalo" style="color: #E4852E" target="_blank">Vincent Kyalo</a></p>
    </footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
</style>
