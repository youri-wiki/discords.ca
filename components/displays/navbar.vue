<template>
    <div class="container">
        <img class="logo" src="https://discords.ca/api/image/displays" />
        <div class="elements">
            <p class="element-p" :class="{ 'current-element': isCurrentPath('/displays') }">
                <i class="fas fa-home"></i>
            </p>
            <p class="element-p" :class="{ 'current-element': isCurrentPath('/info') }">
                <i class="fas fa-info-circle"></i>
            </p>
            <p class="element-p" :class="{ 'current-element': isCurrentPath('/patch-note') }">
                <i class="fas fa-sticky-note"></i>
            </p>
        </div>
        <div class="right-element">
            <p class="element-p" @click="redirectToSignIn">
                <i class="fas fa-sign-in-alt"></i>
            </p>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        redirectToSignIn() {
            this.$router.push({ path: '/display-dashboard' }); // Replace '/sign-in' with your actual sign-in route
        },
        isCurrentPath(path) {
            return this.$route.path === path;
        }
    }
}
</script>



<style scoped>
.container {
    display: flex;
    padding-left: 10%;
    width: 90%;
    height: 60px;
    border-bottom-right-radius: 20px;
    flex-direction: row;
    align-items: center;
    position: relative;
    border-bottom: #757575 2px solid;
    justify-content: space-between;
}

.elements {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 15rem;
    height: 100%;
}

.right-element {
    margin-left: auto;
    margin-right: 20px;
}

.element-p {
    font-size: 27px;
    margin-left: 20px;
    color: #484848;
    align-items: center;
    justify-content: center;
    top: 0;
    transition: all 0.2s ease-in-out;
}

.element-p i {
    position: relative;
    bottom: 0;
    right: 0;
    transition: all 0.2s ease-in-out;
}

.current-element i {
    color: #4b607f;
    position: relative;
}

.current-element:hover {
    bottom: 0;
}

.element-p:hover i {
    color: #4b607f;
    bottom: 10px;
    position: relative;
}

.right-element .element-p:hover i {
    bottom: 0;
    right: 10px;
}

.logo {
    height: 40px;
    margin-left: 20px;
    margin-right: 10px;
}
</style>
