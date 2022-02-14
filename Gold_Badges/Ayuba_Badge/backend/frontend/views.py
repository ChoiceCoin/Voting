from django.dispatch import receiver
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib import messages
from .forms import CommitVoteForm, CustomUserCreationForm
from django.contrib.auth.views import LoginView,LogoutView
from algosdk.v2client import algod
from algosdk import mnemonic,transaction

def wait_for_confirmation(client, txid):
    last_round = client.status().get('last-round')
    txinfo = client.pending_transaction_info(txid)
    while not (txinfo.get('confirmed-round') and txinfo.get('confirmed-round') > 0):
        print('Waiting for confirmation')
        last_round += 1
        client.status_after_block(last_round)
        txinfo = client.pending_transaction_info(txid)
    print('Transaction confirmed in round', txinfo.get('confirmed-round'))
    return txinfo

algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "nH6GvZZLPE2a6yZSLX2BH7Mk5HArCVlF61zv7ps1"
headers = {
   "X-API-Key": algod_token,
}


algodclient = algod.AlgodClient(algod_token, algod_address, headers)

params = algodclient.suggested_params()


existing_account1 = 'BY6T6BB3ZQP5IOTATATDWPLKAKUTRL5IJUSI4573VVTRU3UP6GVGQSN4LI'
mnemonic1 = 'feed trend mean scissors region gasp fashion hint case jewel ability seed leg wife share mushroom lizard craft armed today multiply match mom abstract young'
private_key1 = mnemonic.to_private_key(mnemonic1)

existing_account2 = 'CC2NN5NTJIKBGP7UBNW6AKHOOP2MJWVQRCZYRN7NOKI3V4ZWKHGSRIANB4'
mnemonic2 = 'culture best wear board fiction paddle mix dwarf man glad strike treat armed inquiry sugar split drama pulse runway fish tenant split result abstract misery'
private_key2 = mnemonic.to_private_key(mnemonic2)

existing_account3 = 'C73S3TWSN2PG25OZD7VEGTLGDBUVEVYE4R4A5ZG3JAJJ2Q4FZYDZLKAD6U'
mnemonic3 = 'sadness wild laptop attend protect travel observe fossil fall trick zebra action around honey love utility sunset shoulder base chair trend click camera about crane'
private_key3 = mnemonic.to_private_key(mnemonic3)

receiver_address = 'HSCWQUOUXCY5I6F3LET2SPFE366OZYQIBJTE4OGLIDQTPHSUFKIEAMU5RM'

def index(request):
    
    return render(request,'frontend/index.html')

def Confirm_vote(request):
    form = CommitVoteForm()
    if request.method == 'POST':
        form = CommitVoteForm(request.POST)

        if form.is_valid():
            send_amount = form.cleaned_data["amount"]
            sender_address = request.user.userprofile.wallet_address
            tx = transaction.PaymentTxn(existing_account1,params.min_fee,params.first,params.last,params.gh,receiver_address,send_amount)
            signed_tx = tx.sign(private_key1)
            txid = algodclient.send_transaction(signed_tx)
            print('Transaction sent with ID', txid)
            messages.success(request,f'Successfully Commited {send_amount} Choice Coin for vote, https://testnet.algoexplorer.io/tx/{txid}')
        return HttpResponseRedirect('/')
    return render(request,'frontend/confirm_vote.html',{'form':form})

def register(request):
    form = CustomUserCreationForm()
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,f'{form.cleaned_data["first_name"]} {form.cleaned_data["last_name"]} registered successfully')

    return render(request, "frontend/register.html",{"form":form})

class LoginView(LoginView):
    template_name = "frontend/login.html"


class LogoutView(LogoutView):
    template_name = "frontend/logout.html"