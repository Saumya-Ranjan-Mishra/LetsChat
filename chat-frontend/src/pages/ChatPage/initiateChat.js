import './chat.css'

const ChatToggle = ({setIsUserLoggedIn}) => {
  return (
    <div style={{ textAlign: 'center' }}>
        <div style={{ marginTop: '20px', height: '500px', border: '5px solid black', borderRadius: '8px' }}>
          <div className="row">
          <div className="leftcolumn" style={{ backgroundColor: '#aaa', padding: '10px' }}>
              <div> first Person </div>
              <div> second Person </div>
          </div>
          <div className="rightcolumn" style={{ backgroundColor: '#bbb' }}>
              <h2>Column 2</h2>
              <p>Some text..</p>
          </div>
          </div>
        </div>
        <button onClick={() => setIsUserLoggedIn(false)}>Logout</button>
    </div>
  );
};

export default ChatToggle;
