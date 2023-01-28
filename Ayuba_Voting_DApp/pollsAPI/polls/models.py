from django.db import models
from algosdk.v2client import algod

address1 = "H5AS6SDKPVXGFCYJTPPDNEZVBSTXTQOJNYIBPKQOYXJPMABJROWJ5SFVHI"
address2 = "7NIUXQYVMSJWCIUOZJ53OVPC7PB46PDB7NCPU24WZ7XE4YBT3STAFUL5LM"

algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "nH6GvZZLPE2a6yZSLX2BH7Mk5HArCVlF61zv7ps1"

headers = {
   "X-API-Key": algod_token,
}

algod_client = algod.AlgodClient(algod_token, algod_address,headers)

balance1 = algod_client.account_info(address1)["amount"]
balance2 = algod_client.account_info(address2)["amount"]
balance = balance1 + balance2
    



class Poll(models.Model):
    start_date = models.DateTimeField()
    end_date_in_hours = models.IntegerField()
    logo = models.ImageField(upload_to='logo',null=True,blank=True)
    asa_id = models.IntegerField()
    asa_name = models.CharField(max_length=100)
    creator = models.CharField(max_length=100)
    option_1_address = models.CharField(max_length=100,default='')
    option_2_address = models.CharField(max_length=100,default='')
    question = models.TextField(max_length=300)

    option_one = models.CharField(max_length=100)
    option_two = models.CharField(max_length=100)

    option_one_count = models.IntegerField(default=0)
    option_two_count = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.asa_name}'

class IsActive(models.Model):
    reward_pool = models.IntegerField(default=balance)
    Active_polls = models.ForeignKey(Poll,related_name='active',on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.Active_polls}'

class CompletedPoll(models.Model):
    Completed_polls = models.ForeignKey(Poll,related_name='upcomming',on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.Completed_polls}'

class UpcommingPoll(models.Model):
    start_date = models.DateField()
    upcomming_poll = models.ForeignKey(Poll,related_name='completed',on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.upcomming_poll}'

class TotalVote(models.Model):
    total_amount = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.total_amount}'