module.exports = {
	validateLogin :(email, password) => {
		var res = ""
		//res += ValidateEmail(email)
		//res += ValidatePassword(password)
		return res;
	},

	validateSignup :  (fname,lname, email, password , confirm_password) =>{
		var res = ""

		if(fname.length<1)
			res +="You have entered an empty Name\n"

		if(lname.length<1)
			res +="You have entered an empty Family Name\n"

		if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
			res += "You have entered an invalid email address!\n"
			
		if(password.length <6 )
			res+= ("Password Length must be more than 6!\n")
		
		var upperCaseLetters = /[A-Z]/g;
		if(!password.match(upperCaseLetters)) 
			res+= ("Password must include at least 1 upper case letters\n")
		
		var lowerCaseLetters = /[a-z]/g;
		if(!password.match(lowerCaseLetters)) 
			res+= ("Password must include at least 1 lower case letters\n")
		
		var numLetters = /[0-9]/g;
		if(!password.match(numLetters)) 
			res+= ("Password must include at least 1 number\n")
		
		var specialLetters = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/;
		if(!password.match(specialLetters)) 
			res+= ("Password must include at least 1 special letter\n")
		
		if(password.toString().localeCompare(confirm_password.toString())) 
			res += "Password are not matching each other\n"
			
		return res;
	},

	 ValidateEmail : (email)  =>
	{
		var res=""
		
		if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
		{
			res += "You have entered an invalid email address!\n"
		}
		
		return res
	},

	 ValidatePassword: (password)=>{
		
		var res=""
		
		if(password.length <6 )
			res+= ("Password Length must be more than 6!\n")
		
		var upperCaseLetters = /[A-Z]/g;
		if(!password.match(upperCaseLetters)) 
			res+= ("Password must include at least 1 upper case letters\n")
		
		var lowerCaseLetters = /[a-z]/g;
		if(!password.match(lowerCaseLetters)) 
			res+= ("Password must include at least 1 lower case letters\n")
		
		var numLetters = /[0-9]/g;
		if(!password.match(numLetters)) 
			res+= ("Password must include at least 1 number\n")
		
		var specialLetters = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/;
		if(!password.match(specialLetters)) 
			res+= ("Password must include at least 1 special letter\n")
		
		
		return res
			
	}
};