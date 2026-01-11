const Login = ({ username, handleLogout }) => (
    <div>{username} logged in
        <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
        </form>     
    </div>
)

export default Login