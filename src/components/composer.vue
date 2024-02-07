<template>
    <div class="compose-container">
        <div class="compose">
            <div class="compose-header">
                <div style="display: flex; align-content: space-between; flex-wrap: nowrap;">
                    <input type="text" placeholder="to:" v-model="currentTo" @keyup.enter="addTO">
                    <button @click="addTO" title="add">+</button>
                    <select v-model="priority" title="select priority">
                        <option disabled>Priority</option>
                        <option>LOW</option>
                        <option>NORMAL</option>
                        <option>HIGH</option>
                        <option>TOP</option>
                    </select>
                </div>

                <div class="error">
                    <p v-if="toError=='invalidAddress'">wrong email address format</p>
                    <p v-if="toError=='reenteredAddress'">this address is already chosen</p>
                    <p v-if="toError=='toNeeded'">at least one address has to be entered</p>
                    <p v-if="toError=='notExist'">{{ wrongAddress }} doesn't exist</p>
                </div>

                <div class="view-container">
                    <div class="view-item" v-for="email in to">
                        <p>{{email}}</p>
                        <button title="delete" class="delete" @click="deleteTO(email)">x</button>
                    </div>
                </div>

                <input type="text" placeholder="subject" v-model="subject">
            </div>
            <div class="compose-body">
                <div class="compose-body-text">
                    <textarea placeholder="text" v-model="bodyText"></textarea>
                </div>
                <div class="compose-attachments">
                    <div class="view-container">
                        <div class="view-item view-attachment" v-for="fileName in attachments">
                            <a :href="`https://email-server-back.onrender.com/body/attachment/${userId}/${id}/${fileName}`">{{ fileName }}</a>
                            <button title="delete" class="delete" @click="deleteAttachment(fileName)">x</button>
                        </div>
                    </div>

                    <div class="error">
                        <p v-if="attachmentError=='reenteredAttachment'">this file was selected before</p>
                        <p v-if="attachmentError=='maxReached'">the choosen file's size is greater than max size (100MB)</p>
                    </div>

                    <label for="file-input" title="add attachment" >
                        <img id="attach-img" src="..\assets\Images\attachment-icon.jpg" alt="add attachment">
                    </label>
                    <input id="file-input" ref="fileInput" type="file" @change="addFile"/>                  
                </div>
            </div>   
            <button class="send" title="send mail" @click="sendMail">SEND</button>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    const acceptedEmailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    export default {
        data() {
            return {
                to: [],
                currentTo: null,
                toError: null,
                wrongAddress: null,
                subject: '',
                bodyText: null,
                attachments: [],
                attachmentError: null,
                priority: 'Priority',
                id: null,
                userId: this.$route.query.userid
            }
        },

        mounted() {
            const id = this.$route.params.id
            if (id=='new') {
                this.id = crypto.randomUUID()
                fetch(`https://email-server-back.onrender.com/create/${this.userId}`,{
                    method: 'POST',
                    body: this.id
                })
                .catch(e=>{
                    console.log(e)
                })
            }
            else {
                fetch(`https://email-server-back.onrender.com/mainfolders/getdraft/${this.userId}/${id}`)
                .then(res=>res.json())
                .then(mail=> {
                    this.id = id
                    this.to = mail.header.to
                    this.subject = mail.header.subject
                    this.bodyText = mail.body.text
                    this.priority = mail.header.priority
                    this.attachments = mail.body.attachments.map(attachment=>attachment.name)
                })
                .catch(e=>{
                    console.log(e)
                })
            }
        },

        watch: {
            bodyText: {
                handler: _.debounce(function (){
                    this.sendBodyText()
                },2000)
            },
            subject: {
                handler: _.debounce(function (){
                    this.sendSubject()
                },2000)
            },
            priority:{
                handler() {
                    this.sendPriority()
                }
            }
        },

        methods: {
            addTO() {
                if (acceptedEmailRgx.test(this.currentTo)) {
                    if (this.to.includes(this.currentTo)) {
                        this.toError = 'reenteredAddress'
                    }
                    else {
                        this.toError = null
                        this.to.push(this.currentTo)
                        this.sendNewTO()
                    }
                    
                }
                else 
                {
                    this.toError = 'invalidAddress'
                }
            },
            deleteTO(email) {
                this.to = this.to.filter(item => item !== email);
                this.sendRemoveTo(email)
            },
            addFile() {
                const fileInput = this.$refs.fileInput;
                if (fileInput.files.length==0) {
                    return
                }
                if (this.attachments.includes(fileInput.files[0].name)) {
                    this.attachmentError = 'reenteredAttachment'
                }
                else if(fileInput.files[0].size > 100*1024*1024) {
                    this.attachmentError = 'maxReached'
                }
                else {
                    this.attachments.push(fileInput.files[0].name)
                    this.sendAttachment()
                    fileInput.value = null
                    this.attachmentError = null
                }
            },
            deleteAttachment(fileName) {
                this.attachments = this.attachments.filter(item => item !== fileName);
                this.sendDeleteAttachment(fileName)
            },
            sendBodyText() {
                fetch(`https://email-server-back.onrender.com/body/text/${this.userId}/${this.id}`, {
                    method: 'PUT',
                    body: this.bodyText
                })
                .catch(e=> {
                    console.log(e);
                }) 
            },
            sendNewTO() {
                fetch(`https://email-server-back.onrender.com/header/addto/${this.userId}/${this.id}`, {
                    method: 'POST',
                    body: this.currentTo
                })
                .catch(e=> {
                    console.log(e);
                }) 
            },
            sendRemoveTo(email) {
                fetch(`https://email-server-back.onrender.com/header/removeto/${this.id}/${email}`, {
                    method: 'DELETE'
                })
                .catch(e=> {
                    console.log(e);
                }) 
            },
            sendSubject() {
                fetch(`https://email-server-back.onrender.com/header/subject/${this.userId}/${this.id}`, {
                    method: 'PUT',
                    body: this.subject
                })
                .catch(e=> {
                    console.log(e);
                }) 
            },
            sendPriority() {
                fetch(`https://email-server-back.onrender.com/header/priority/${this.userId}/${this.id}`, {
                    method: 'PUT',
                    body: this.priority
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            sendAttachment() {
                let formData = new FormData();
                formData.append('file', this.$refs.fileInput.files[0]);

                fetch(`https://email-server-back.onrender.com/body/attachment/${this.userId}/${this.id}`, {
                    method: 'POST',
                    body: formData
                })
                .catch(e => {
                    console.error(e);
                });
            },
            sendDeleteAttachment(fileName) {
                fetch(`https://email-server-back.onrender.com/body/attachment/${this.id}/${fileName}`,{
                    method: 'DELETE'
                })
                .catch(e=>{
                    console.log(e)
                })
            },
            sendMail() {
                if (this.to.length==0) {
                    this.toError = 'toNeeded'
                    return
                }
                fetch(`https://email-server-back.onrender.com/mails/Sendmail/${this.userId}/${this.id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.to)
                })
                .then(res=>{
                    //if (the good condition) {
                    //  this.toError = null
                    // }
                    // else {
                    //  this.toError = 'notExist'
                    //  this.wrongAddress = <the address returned>
                    // }
                })
                .catch(e=>{
                    console.log(e)
                })
            }
        }
    }
</script>

<style scoped>
    .compose-container{
        background: white;
        height: 100%;
        width: calc(100% - 180px - 260px);
        margin: 0;
        padding: 0;
        overflow-y: scroll;
    }
    .compose{
        margin: 3% auto;
        padding: 18px 50px;
    }
    .compose-header input{
        width: 100%;
    }
    .view-container{
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }
    .view-item{
        border-radius: 15px;
        border-style: groove;
        padding: 0;
        margin: 2px;
        display: flex;
        flex-wrap: nowrap;
        float: left;
    }
    .view-item p{
        padding: 5px;
    }
    .view-attachment:hover {
        border-width: 4px;
        cursor: pointer;
    }
    .view-attachment a{
        text-decoration: none;
        color: inherit;
        padding: 5px;
    }
    .delete {
        padding: 1px;
        margin: 2px;
        border-radius: 100%;
        border-color: rgba(0, 0, 0, 0.1);
    }
    .delete:hover {
        border-color: rgba(0, 0, 0, 0.6);
    }
    .compose-body-text textarea{
        width: 100%;
        height: 70vh;
        resize: none;
    }
    .compose-attachments {
        border-width: 1px;
        border-style: solid;
        border-top-style: hidden;
    }
    .compose-attachments #attach-img {
        width: 20px;
        border-width: 1px;
        padding: 2px;
        margin: 2px;
    }
    .compose-attachments label:hover {
        cursor: pointer;
    }
    .compose-attachments input {
        display: none;
    }
    .error {
        color: red;
    }
    .send {
        float: right;
        margin-top: 10px;
        padding: 8px;
        background-color: #0e85ed;
    }
    .send:hover {
        background-color: #0a72cc;
    }
</style>