import "./UserList.css"
import User from "../User"

const UserList = ({ contacts }) => {

    return (
        (contacts.length > 0) ?
            <section className="userList">
                <div className="users">
                    {contacts.map(u =>
                        <User
                            key={u.id}
                            name={u.first + " " + u.last}
                            avatar={u.avatar}
                        />)}
                </div>
            </section>
            :
            <section className="userList">
                <p><em>Nenhum contato cadastrado</em></p>
            </section>
    )
}

export default UserList