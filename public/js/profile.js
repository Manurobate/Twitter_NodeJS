window.addEventListener("DOMContentLoaded", function () {
    const inputProfile = document.querySelector("#profile-input");
    const formProfile = document.querySelector("#profile-form");

    formProfile.addEventListener("click", function () {
        inputProfile.click();
    })

    inputProfile.addEventListener("change", function () {
        formProfile.submit();
    })
})