

export function formatDate(timestamp){
    const d = new Date(timestamp);
    const time = d.toLocaleDateString('en-US')
    return time.substr(0,5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}


export function formatQuestion (question,author,authUser){
    const {id, timestamp,optionOne,optionTwo} = question;
    const {name, avatarURL} = author;

    return{
        name,
        id,
        timestamp,
        avatar: avatarURL,
        optionOne,
        optionTwo,
    }
}