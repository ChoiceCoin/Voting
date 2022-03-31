$(document).ready(function () {

    let is_storage = true;

    if (typeof(Storage) === "undefined") {
        is_storage = false;
        alert('Please update to a modern browser');
    }
if (document.querySelector('.proposal_list') !== null) {
	$.ajax({
		type: "GET",
		url: "./assets/js/data.json",
		dataType: "json",

		error: function (e) {
			alert(
				"An error occurred while processing data. \n Please run program on a local server as cross-origin request are disabled on modern web browsers"
			);
		},

		success: function (response) {

            if (is_storage) {
                let data = JSON.parse(sessionStorage.getItem('choice-vote'));

                if (data !== null) {
                    response = data.proposals;
                }else{
                    sessionStorage.setItem("choice-vote", JSON.stringify({
                        proposals: response,
                        curr_proposal: null,
                        wallet: false,
                        wallet_address: [],
                        selected_address: null
                    }));
                }
            }

			// make sure the div is empty before appending data to it
			$(".proposal_list").children().remove();

            let item = '';
            $(response).each(function (index, record) {

                item += `<article class="proposal_item_tile col-xs-6">
                <div class="item_tile_inner">
                    <div class="item_tile_thumb">
                        <div class="card_image">
                            <a href="#">
                                <img src="assets/images/${record.image}" alt="${record.title}">
                            </a>
                        </div>
                        <div class="item_dismiss">
                            <span class="badge badge-${record.status}">${record.status}</span>
                        </div>
                    </div>
                    <div class="item_tile_info">
                        <h4 class="proposal_item_name"><a href="#">${record.title}</a></h4>
                        <div>
                            <div class="proposal_summary">
                                <p>${record.summary}</p>
                            </div>
                            <div class="proposal_data">
                                <span class="">${record.author}</span>
                                <time>${record.start_date} - ${record.end_date}</time>
                            </div>
                        </div>
                        <div class="card_cta" title="View Proposal">
                            <button type="button" class="btn btn-block btn-inverse view-proposal" data-slug="${record.slug}">View Proposal</button>
                        </div>
                    </div>
                </div>
            </article>`;
            
            });
            $(".proposal_list").html(item);
		},
	});
}

    $(document).on("click", ".view-proposal" ,function() {
        let slug = $(this).attr('data-slug');

        if (slug && is_storage) 
        {
            let data = JSON.parse(sessionStorage.getItem('choice-vote'));

            if (data !== undefined) {
                sessionStorage.setItem("choice-vote", JSON.stringify({
                    ...data,
                    curr_proposal: data.proposals.find(record => record.slug == slug)
                }));
                window.location.href = "view-proposal.html";
            }
        }  
    });


    if (document.querySelector('.proposal-info') !== null) {
        if (is_storage && sessionStorage.getItem('choice-vote') !== undefined) {
            let data = JSON.parse(sessionStorage.getItem('choice-vote'));

            if (data.curr_proposal) {
                let info = `<div class="details_panel_body margin_top_s">
                    <div class="section_header">
                        <span class="text-caps preview_heading">${data.curr_proposal.title} <span class="badge badge-${data.curr_proposal.status}">
                        ${data.curr_proposal.status}
                        </span></span>
                        <p>${data.curr_proposal.summary}</p>
                    </div>
                    
                
                </div>
            
                <div class="details_panel_body margin_top_s">
                    <div class="section_header">
                        <span class="text-caps preview_heading">Proposal Details</span>
                    </div>
                    <div class="cart_container">
                        <div class="data_item">
                            <span class="data_label color-grey">Created By:</span>
                            <span>${data.curr_proposal.author}</span>
                        </div>
                        <div class="data_item margin_top_m">
                            <span class="data_label color-grey">Active Date:</span>
                            <span>
                                <time>${data.curr_proposal.start_date} - ${data.curr_proposal.end_date}</time>
                            </span>
                        </div>
                    </div>
                </div>`;
                $(".proposal-info").html(info);
            }
        }
        
    }

    $(document).on("click", ".voting-type" ,function() {
        if ($(this).val() == "free"){    
            $(".choice-amount").find("input").val('');
            $(".choice-amount").find("input").attr('readonly', true);
        } else {
            $(".choice-amount").find("input").attr('readonly', false);
        }
    });

    $(document).on("click", "#connect-wallet" ,async function () {
        let address = await connectWallet();

        if (address.length && is_storage && sessionStorage.getItem('choice-vote') !== undefined) {
            let data = JSON.parse(sessionStorage.getItem('choice-vote'));
            sessionStorage.setItem("choice-vote", JSON.stringify({
                ...data,
                wallet_address: address.map(record => record.address),
                wallet: true
            }));

            let address_list = ""
            $(address).each(function (index, record) {
                address_list += `<li><a href="javascript:void(0)" class="select-wallet" data-address="${record.address}">${record.address}</a></li>`
            })

            let wallet  = `<div class="dropdown nav_link_item">
                <a href="#" title="Select Wallet" class="dropdown-toggle" data-toggle="dropdown">
                    <div class="link_icon">
                        <span class="link_icon_image wallet-image"></span>
                    </div>
                    <div class="link_label">
                        <span class="hidden-mobile">
                            Select Wallet
                        </span>
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                    ${address_list}
                </ul>
            </div>`;

            $('.utility_nav_list').html(wallet);
        }
        
    });

    $(document).on("click", ".select-wallet" ,async function () {
        let address = $(this).attr("data-address");
        if (address && is_storage && sessionStorage.getItem('choice-vote') !== undefined) {
            let data = JSON.parse(sessionStorage.getItem('choice-vote'));
            sessionStorage.setItem("choice-vote", JSON.stringify({
                ...data,
                selected_address: address,
            }));

            $('#selected-adress').removeClass('d-none');
            $('#selected-adress span').text(address)
        }

    })

    $(document).on("input", ".choice-amount input" ,function() {
        let min = $("#min").val() !== '' ? $("#min").val() : 0;
        let max = $("#max").val() !== '' ? $("#max").val() : 0;
        
        if (min > max && max > 0) {
            alert('Invalid choice amount');
            $("#min,#max").val('0')
        }
    });

    $(document).on("change", "#category" ,function() {
        if ($(this).val() == "free"){    
            $("#fee").val('');
            $("#fee").attr('readonly', true);
            $("#fee").attr('required', false);
        } else {
            $("#fee").attr('readonly', false);
            $("#fee").attr('required', true);
        }
    });

    $(document).on("submit", "#proposal-form" ,function(e) {
        e.preventDefault();
        let form = {};
        let formData = new FormData(this)
        formData.forEach((value, key) => form[key] = (key == "min" || key == "max")  && value === '' ? 0 : value);

        if (is_storage && sessionStorage.getItem('choice-vote') !== undefined) {
            let data = JSON.parse(sessionStorage.getItem('choice-vote'));
            let success = false;

            if (!data.wallet) {
                alert("Please connect a wallet");
                return false;
            }else if(data.selected_address === null){
                alert("Please select a wallet address");
                return false;
            }

            form['author'] = data.selected_address;
            let created_date = new Date();
            let start_date = new Date(form['start_date']);

            if (created_date.getTime() >start_date.getTime() ) {
                form['status'] = "active";
            }else{
                form['status'] = "pending";
            }

            form['created_date'] = created_date;

            form['slug'] = slugify(form.title);
            form['image'] = "view-proposal.png";


           if (form.category == 'paid') {
                //makeChoicePayment(form.fee)
            }else{
                success = true
            }

            if (!success) {
                alert('error')
            }
            data.proposals.push(form);
            sessionStorage.setItem("choice-vote", JSON.stringify({
                ...data,
                proposals: data.proposals
            }));
            window.location.href = "index.html";

        }
    });

    if (is_storage && sessionStorage.getItem('choice-vote') !== undefined) {
        let data = JSON.parse(sessionStorage.getItem('choice-vote'));

        if (data && data.wallet_address.length) {
            let address_list = ""
            $(data.wallet_address).each(function (index, record) {
                address_list += `<li><a href="javascript:void(0)" class="select-wallet" data-address="${record}">${record}</a></li>`
            })

            let wallet  = `<div class="dropdown nav_link_item">
                <a href="#" title="Select Wallet" class="dropdown-toggle" data-toggle="dropdown">
                    <div class="link_icon">
                        <span class="link_icon_image wallet-image"></span>
                    </div>
                    <div class="link_label">
                        <span class="hidden-mobile">
                            Select Wallet
                        </span>
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                    ${address_list}
                </ul>
            </div>`;

            $('.utility_nav_list').html(wallet);
        }

        if (data && data.selected_address !== null) {
            $('#selected-adress').removeClass('d-none');
            $('#selected-adress span').text(data.selected_address);
        }else{
            $('#selected-adress').addClass('d-none');
            $('#selected-adress span').text('')
        }
        
    }
});

function slugify(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
