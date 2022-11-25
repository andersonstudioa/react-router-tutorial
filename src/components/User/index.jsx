import "./User.css"

const User = ({ name, avatar }) => {
    return (
        <>
            <div className="user">
                <img src={avatar ? avatar : "https://unsplash.it/100/100"} />
                <p>
                    {name}
                </p>
            </div>
        </>
    )
}

export default User