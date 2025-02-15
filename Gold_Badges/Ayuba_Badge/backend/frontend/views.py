from django.dispatch import receiver
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib import messages
from .forms import CommitVoteForm, CustomUserCreationForm
from django.contrib.auth.views import LoginView,LogoutView
from algosdk.v2client import algod
from algosdk import mnemonic,transaction


algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "nH6GvZZLPE2a6yZSLX2BH7Mk5HArCVlF61zv7ps1"
headers = {
   "X-API-Key": algod_token,
}


algodclient = algod.AlgodClient(algod_token, algod_address, headers)

params = algodclient.suggested_params()


existing_account1 = ''
mnemonic1 = ''
private_key1 = mnemonic.to_private_key(mnemonic1)

existing_account2 = ''
mnemonic2 = ''
private_key2 = mnemonic.to_private_key(mnemonic2)

existing_account3 = ''
mnemonic3 = ''
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
            tx = transaction.PaymentTxn(sender_address,params.min_fee,params.first,params.last,params.gh,receiver_address,send_amount)
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
