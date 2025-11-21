
export function LaunchPad() {

    function createToken(){
        const name = document.getElementById("name").value;
        const symbol = document.getElementById("symbol").value;
        const imgurl = document.getElementById("imgurl").value;
        const initialsupply = document.getElementById("initialsupply").value;

        console.log({
            name,
            symbol,
            imgurl,
            initialsupply,
        })

        
    }
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id="name" className='inputText' type='text' placeholder='Name'></input> <br />
        <input id="symbol" className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id="imgurl" className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id="initialsupply" className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn cursor-pointer'>Create a token</button>
    </div>
}