let menuContainer;

window.addEventListener('DOMContentLoaded', () => {
    menuContainer = document.querySelector('#search-menu-container');

    menuContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const searchInput = document.querySelector('#search-input');
    let ref;

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;

        if (ref)
            clearTimeout(ref);

        ref = setTimeout(() => {
            axios.get('/users?search=' + value)
                .then((response) => {
                    menuContainer.innerHTML = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }, 2000);
    })
});

window.addEventListener('click', () => {
    menuContainer.innerHTML = '';
});