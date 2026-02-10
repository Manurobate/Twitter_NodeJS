window.addEventListener("DOMContentLoaded", function () {
    bindTweetDelete();
})

function bindTweetDelete() {
    const elements = document.querySelectorAll('.btn-danger');
    elements.forEach(function (element) {
        element.addEventListener('click', function (event) {
            const tweetId = event.target.getAttribute("tweetid");
            axios.delete(`/tweets/${tweetId}`)
                .then(function (response) {
                    document.querySelector('#tweet-list-container').innerHTML = response.data;
                    bindTweetDelete();
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
    })
}