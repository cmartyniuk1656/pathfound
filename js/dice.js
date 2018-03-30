var dice = {
  sides: 6,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}

var Dice = {
    
    "four": {
        
        sides: 4,
        
        roll: function () {
            
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            
            }  
    },
    
    "six": {
        
        sides: 6,
        
        roll: function () {
            
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            
            }  
    },
    
    "eight": {
        
        sides: 8,
        
        roll: function () {
            
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            
            } 
    },
    
    "ten": {
        
        sides: 10,
        
        roll: function () {
            
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            
            }    
    },
    
    "twelve": {
        
        sides: 12,
        
        roll: function () {
            
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            
            } 
    },
    
    "twenty": {
        
        sides: 20,
        
        roll: function () {
            
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            
            }
    }
    
    
}