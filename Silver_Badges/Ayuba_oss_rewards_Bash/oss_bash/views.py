from ast import Param
from django.dispatch import receiver
from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import DeveloperForm,RewardForm
from .models import Developer
from algosdk.v2client import algod
from algosdk import mnemonic,transaction

# Create your views here.

algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "nH6GvZZLPE2a6yZSLX2BH7Mk5HArCVlF61zv7ps1"
headers = {
   "X-API-Key": algod_token,
}

algod_client = algod.AlgodClient(algod_token, algod_address, headers)

accounts = {}

sender_mnemonic = "cause tongue pyramid wire senior roof uncover usual pig shove note account appear celery fuel fog middle mandate disease kit vehicle anger hobby above ignore"
sender_address ="MS6LODT2XZA3Y7S2RYEHVSVHV4XT7KKZVWSUVUOG5Y467F243MGFR45UFQ"
private_key = mnemonic.to_private_key(sender_mnemonic)
public_key = mnemonic.to_public_key(sender_mnemonic)

def index(request):
    if request.method == 'POST':
        dev = DeveloperForm(request.POST)
        if dev.is_valid():
            dev.save()
            return HttpResponseRedirect('/thanks/')
    else:
        dev = DeveloperForm()
    return render(request,'index.html',{'dev':dev})

def reward(request):
    address = Developer.objects.all()
    if request.method == 'POST':
        rew = RewardForm(request.POST)
        if rew.is_valid():
            params = algod_client.suggested_params()
            status = algod_client.status()
            print(status['last-round'])
            current_round = status['last-round']
            avg_no_of_blocks = 200/4.35
            first_valid_round = int(current_round + avg_no_of_blocks)
            last_valid_round = int(first_valid_round + 10)
            params.flat_fee = True

            #gh = params.gh
            get_ammount = request.POST.get('reward')
            amt = int(get_ammount)
            receiver_list = []
            counter = 0
            for j in address:
                receiver_list.append(j.wallet_address)

            while 1>0:
                status = algod_client.status()
                current_round = int(status['last-round'])
                if current_round > first_valid_round:
                    txn = transaction.PaymentTxn(sender_address,1000,first_valid_round,last_valid_round,params.gh,receiver_list[counter],amt)
                    sign_txn =txn.sign(private_key)
                    txn_id = algod_client.send_transaction(sign_txn)
                    print("txn: {} amount: {}".format(txn_id,amt))
                    break
            return HttpResponseRedirect('/reward_table/')
    else:
        rew = RewardForm()
    return render(request,'reward.html',{'rew':rew,'address':address}) 

def thankYouPage(request):
    return render(request,'thanks.html')

def sent(request):
    return render(request,'reward_sent.html')

def reward_table(request):
    addr = Developer.objects.all()
    return render(request,'reward_table.html',{'addr':addr})