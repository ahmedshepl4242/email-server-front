<template>
    <div class="mail-message">
        <div>
            <h1>{{ subject }}</h1>
            <div class="sender-options">
                <img src="http://placekitten.com/g/48/48" />
                <div>
                    <div v-if="senderName==userId" v-for="reciever in recieversNames" style="padding: 2px;">{{ reciever }}</div>
                    <div v-if="senderName!=userId">{{ senderName }}</div>
                    </div>
                <!-- /end sender's info -->
                <ul>
                    <li>{{ date }}</li>
                </ul>
                <!-- /end sender's options -->
            </div>
            <!-- /end sender optioons -->
            <div class="mail-message-body">
                <div class="body-text">
                    {{ bodyText }}
                </div>

                <div class="view-container">
                    <div class="view-attachment" v-for="fileName in attachments">
                        <a :href="`https://email-server-back.onrender.com/body/attachment/${userId}/${id}/${fileName}`">{{ fileName }}</a>
                    </div>
                </div>
            </div>
            <!-- /end mail message body -->
        </div>
    </div>
    <!-- /end mail message -->
</template>

<script>
import axios from "axios";

export default {
    
    data() {
        return {
            subject: null,
            senderName  : null,
            recieversNames: [],
            date: null,
            bodyText: null,
            attachments: [],
            id: this.$route.query.id,
            userId: this.$route.query.userid,
            folderPath: this.$route.query.path
        }
    },
    async mounted() {
        const response = await axios.get(
    `https://email-server-back.onrender.com/mainfolders/${this.folderPath}/${this.userId}/${this.id}`
   );
        // fetch(`https://email-server-back.onrender.com/mainfolders/${this.folderPath}/${this.userId}/${this.id}`)
        // .then(res=>res.json())
        // .then(mail=> {
         let mail=response.data
            this.id = mail["id"]
            this.senderName = mail["header"]["from"]
            this.recieversNames = mail["header"]["to"]
            this.subject = mail["header"]["subject"]
            this.date = mail["header"]["date"]
            this.bodyText = mail.body.text
            this.attachments = mail.body.attachments.map(attachment=>attachment.name)
    //     })
     }
}
</script>

<style scoped>
.view-container {
    padding: 0;
    display: flex;
    flex-direction: column;
    float: left;
}

.view-attachment {
    border-radius: 15px;
    border-style: groove;
    padding: 0;
    margin: 2px;
    display: flex;
    flex-wrap: nowrap;
    float: left;
}

.view-attachment p {
    padding: 8px;
}

.view-attachment:hover {
    border-width: 4px;
    cursor: pointer;
}

.view-attachment a {
    text-decoration: none;
    color: inherit;
    padding: 5px;
}
.body-text {
    white-space: pre-wrap;
}
</style>