function myFunction() {
  TextToCopy = document.getElementById("wallet_value").innerHTML;
  var TempText = document.createElement("input");
  TempText.value = TextToCopy;
  document.body.appendChild(TempText);
  TempText.select();

  document.body.removeChild(TempText);

  alert("Voter's wallet Address is: " + TempText.value);
}

