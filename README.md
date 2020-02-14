<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 d-flex justify-content-center">
                <h4 id="total" style="margin: 15px 0px 15px 0px;"></h4> 
            </div>
            <div class="col-12 d-flex justify-content-center">
                <div id="total"></div>
                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button id="minus" class="btn btn-danger" type="button">-</button>
                    </div>
                    <input class="form-control" id="newNumber" type="text" placeholder="Enter number...">
                    <div class="input-group-append">
                        <button id="add" class="btn btn-success" type="button">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>

        let total = 0;
        
        $('#add').on('click', function(){

            let newNumber = $('#newNumber').val();

            if(isNaN(newNumber)){
                $('#newNumber').val('');
                return;
            }else{
                newNumber = parseInt(newNumber);
                
                total += newNumber;

                document.querySelector('#total').innerHTML = total;

                $('#newNumber').val('');
            }
        })

        $('#minus').on('click', function(){

            let newNumber = $('#newNumber').val();

            if(isNaN(newNumber)){
                $('#newNumber').val('');
                return;
            }else{
                newNumber = parseInt(newNumber);

                total -= newNumber;

                document.querySelector('#total').innerHTML = total;

                $('#newNumber').val('');
            }
        })

    </script>
</body>
</html>
