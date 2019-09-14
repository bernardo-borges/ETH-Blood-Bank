
App = {
    loading: false,
    contracts: {},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const bloodDonation = await $.getJSON('BloodDonation.json');
        App.contracts.BloodDonation = TruffleContract(bloodDonation);
        App.contracts.BloodDonation.setProvider(App.web3Provider);

        // Hydrate the smart contract with values from the blockchain
        App.bloodDonation = await App.contracts.BloodDonation.deployed();
    },

    render: async () => {
        // Prevent double render

        $('#account').html(App.account)

        // Render Tasks



    },

    // renderTasks: async () => {
    //     // Load the total task count from the blockchain
    //     const count = await App.bloodDonation.BloodCount();
    //     const $taskTemplate = $('.taskTemplate');
    //     let $donationsTable = $("#donationsTable");
    //     let $donationsTbody = $donationsTable.find("tBody");
    //
    //     // Render out each task with a new task template
    //     for (var i = 1; i <= count; i++) {
    //         // Fetch the task data from the blockchain
    //
    //         const donation = await App.bloodDonation.donations(i);
    //         const donationId = donation[0].toNumber();
    //         const donationQuantity = donation[1];
    //         const donationPerson = donation[2];
    //         const donationType = donation[3];
    //         const donationDate = donation[4];
    //
    //         let $tr = $('<tr>')
    //
    //             .append($('<td>').html(donationId))
    //             .append($('<td>').html(donationQuantity))
    //             .append($('<td>').html(donationPerson))
    //             .append($('<td>').html(donationType))
    //             .append($('<td>').html(donationDate));
    //
    //
    //         $donationsTbody.append($tr);
    //
    //     }
    // },



    create: async (e) => {

        const personName = $('#person').val();
        const quantity = $('#quantity').val();
        const bloodType = $('#blood-type').val();
        const dateTime = moment().format("YYYY/MM/DD hh:mm:ss");

        if(personName == "" || quantity == "" || bloodType == ""){
             return toastr.info('Empty Fields');
        }

        if(quantity > "350"){
            return toastr.error('Quantity Invalid, Must be below or equal to 350 ml');

        }
        await App.bloodDonation.createDonation(quantity,personName,bloodType,dateTime);
        // window.location.reload();
    },


}

$(function() {
    App.load()
});