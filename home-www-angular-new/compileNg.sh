#!/bin/bash

echo "running ng build ... ";
ng build --output-path=../app/src/main/assets/homedist &&

#echo "deleting all gz files ... ";
#rm -f ../app/src/main/assets/homedist/*.gz &&

echo "sed-ing / to . inside index.html"
sed -i 's/\"\/\"/\"\.\"/g' ../app/src/main/assets/homedist/index.html

#scp -r ../app/src/main/assets/homedist/ ubuntu@tkbx.savimonty.info:~/telemed_patient_ng/.
