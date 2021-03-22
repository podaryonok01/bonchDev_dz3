const btn = document.querySelector('#btn');
const textareaComment = document.querySelector('#comment');
const inputAuthor = document.querySelector('#comment_author');
const elem = document.querySelector('.sort');
const btnSortNew = document.querySelector('#sort_new');
const btnSortOld = document.querySelector('#sort_old');

class Comments {
    arrComments = [];

    newComment (comment) {
        const newComment = new Comment (comment);
        this.arrComments.push(newComment);
        console.log(this.arrComments);

        this.addComment(newComment);
        newComment.btnDelete.addEventListener('click', () => {
            this.removeComment(newComment);
        })
        newComment.btnChange.addEventListener('click', () => {
            this.changeComment(newComment);
        })
    }

    addComment(newComment) {
        let commentAuthor = document.createElement('div');
        let commentDate = document.createElement('div');
        let commentContainer = document.createElement('div');
        let commentText = document.createElement('div');
        commentText.innerText = newComment.comment;
        commentAuthor.innerText = newComment.author;
        commentDate.innerText = newComment.date;
        newComment.btnDelete.innerText = 'Удалить';
        newComment.btnChange.innerText = 'Изменить';

        commentAuthor.classList.add('comment__author');
        commentDate.classList.add('comment__date');
        newComment.btnDelete.classList.add('btn');
        newComment.btnChange.classList.add('btn');

        commentContainer.append(commentDate);
        commentContainer.append(commentAuthor);
        commentContainer.append(commentText);
        commentContainer.append(newComment.btnDelete);
        commentContainer.append(newComment.btnChange);
        commentContainer.classList.add('comment');
        elem.after(commentContainer);
    }

    removeComment(newComment) {
        let index = this.arrComments.findIndex(elem => elem === newComment);
        this.arrComments.splice(index, 1);
        console.log(this.arrComments);
        this.renderComments();
    }

    changeComment(newComment) {
        textareaComment.value = newComment.comment;
        btn.style.display = 'none';
        inputAuthor.style.display = 'none';
        let btnSaveChangge = document.createElement('button');
        btnSaveChangge.classList.add('btn');
        btnSaveChangge.innerText = 'Изменить';
        textareaComment.after(btnSaveChangge);

        btnSaveChangge.addEventListener('click', () => {
            newComment.comment = textareaComment.value;
            textareaComment.value = '';
            btn.style.display = '';
            inputAuthor.style.display = '';
            btnSaveChangge.remove();

            this.renderComments();
        })
    } 
    
    renderComments () {
        document.querySelectorAll('.comment').forEach((elem)=>{
            elem.remove();
        })
        this.arrComments.forEach((elem) => {
            this.addComment(elem);
        })
    }

    filterCommentNew() {
        this.arrComments.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        })
        this.renderComments();
    }

    filterCommentOld() {
        this.arrComments.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        })
        this.renderComments();
    }
}


class Comment {
    constructor(comment) {
        console.log(this);
        this.author = comment.author;
        this.comment = comment.comment;
        this.date = comment.date;

        this.btnDelete = document.createElement('button');
        this.btnChange = document.createElement('button');
    }

    //редактирование комментария
    changeComment() {
        this.btnChange.addEventListener('click', () => {
            textareaComment.value = this.comment;
            btn.style.display = 'none';
            inputAuthor.style.display = 'none';
            let btnSaveChangge = document.createElement('button');
            btnSaveChangge.classList.add('btn');
            btnSaveChangge.innerText = 'Изменить';
            textareaComment.after(btnSaveChangge);

            btnSaveChangge.addEventListener('click', () => {
                this.comment = textareaComment.value;
                textareaComment.value = '';
                btn.style.display = '';
                inputAuthor.style.display = '';
                btnSaveChangge.remove();
            })
        })
    }    

}

const comments = new Comments;

btn.addEventListener('click', () => {
    if (inputAuthor.value !== '' && textareaComment.value !== '') {
        comments.newComment({
            author: inputAuthor.value,
            comment: textareaComment.value,
            date: new Date()
        });
        inputAuthor.value = '';
        textareaComment.value = '';
    } else {alert('Необходимо заполнить все поля!!!')}
    
})

btnSortNew.addEventListener('click', () => {
    comments.filterCommentNew();
})

btnSortOld.addEventListener('click', () => {
    comments.filterCommentOld();
})