let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());

    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
    document.getElementById('NFTButton').style.display = 'block';
}

async function claimTokens() {
    const runTokenContractAddress = "0x663ed886dBdcDf4085E75591fad2C84a9e88f04B";
    const runTokenContractAbi = [
        "function mintTokens(address account, uint256 amount) public",
    ];
    const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
    let convertToWei = 1000000000
    let amountToClaim = window.totalGweiScore * convertToWei
    window.totalGweiScore = 0
    await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
    window.location.reload(true)
} 

async function claimNFT() {
    const nftContractAddress = "0x24aCfbf06234A30601D5221592664bbB33f4b7c4";
    const mintContractAbi = [
        "function mint(uint256 amount) public",
    ];
    const nftContract = new ethers.Contract(nftContractAddress, mintContractAbi, provider);
    window.totalNFTScore = 0
    await nftContract.connect(signer).mint(window.totalNFTScore.toString())
    window.location.reload(true)
} 