var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});

bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});


// message event
bot.on('message', function (user, userID, channelID, message, evt) {

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `!`

if (message.substring(0, 1) == '~') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    switch(cmd) {

        // ~ping
        case 'ping':

            bot.sendMessage({
                to: channelID,
                message: 'Pong!'
            });

        break;

        // Other Commands		
		case 'movie':
			bot.sendMessage({
				to: channelID,
                message: nicCageMovie()
            });

     }

 }

});



function nicCageMovie() {

	var plot = "";
	
	var movieTypes = ['Action', 'Advernture', 'Family', 'Classic Style', 'Drama', 'Rom Com', 'Sci-Fi', 'Fantasy', 'Thriller', 'Mystery', 'Comedy', 'Indie', 'Biography', 'Blockbuster', 'Disaster', 'Parody', 'Documentary', 'Horror'];
	var director = ['Steven Spielberg', 'Russo brothers', 'Peter Jackson', 'Michael Bay', 'James Cameron', 'David Yates', 'J. J. Abrams', 'Tim Burton', 'Ridley Scott', 'Ron Howard', 'Robert Zemeckis', 'Clint Eastwood', 'Alfred Hitchcock', 'Christopher Nolan', 'Martin Scorsese', 'Nicolas Cage himself', 'Ronald Emmerich', 'George Lucas', 'John Woo', 'Quentin Tarantino', 'the Coen Brothers', 'David Fincher', 'David Lynch', 'Spike Lee', 'Kathryn Biglow', 'Ava DuVernay', 'Sofia Coppola', 'Greta Gerwig'];
	var name = ['Jim Buckner', 'Myles Turnbill', 'Gus Worldly', 'Michael Carter', 'Harrison Board', 'Jim Toll', 'Aaron Marker', 'Parker Sanders', 'Donnie Tulles', 'Ben Kirk', 'Woody Marshall', 'Jimmy Hill', 'Hank Wilson', 'Jerry Grant'];
	var plotLineOne = ['In a world where', 'Lost in the mountains', 'Shipwrecked at sea', 'Traveling through space', 'In a distant past', 'In the near future', 'While driving to work', "When a doctor's diagnosis reveals bad news", 'Stuck in a sticky situation', 'Listening for alien signals', 'Developing a new app', 'Experimenting with illicit drugs', 'After adopting a cat', 'After adopting a dog', 'While terraforming Mars', 'At the bottom of the ocean', 'While working as a blacksmith', "Searching for the world's best burrito", 'After one night of partying', 'During the Super Bowl', 'While managing the Texas Rangers', "After eating the world's juciest steak", "After creating a device to travel through time", "At his child's school", 'During a routine trip to the bank', "After discovering his wife wasn't real", 'When fixing his car', 'When being transported on a train full of psychotic chefs', 'While transferring from a busy airport', 'Driving down a country road', 'Sheetrocking his house', 'While opening his small business', 'While filing his taxes', 'Climbing the rock wall at the gym', 'Repainting his house to a neutral color', 'Removing the termites from his garage', 'Throwing out the ceremonious first pitch of a baseball game', 'Accepting an invitation to a "special" party for the country\'s elites', 'After receiving a mysterious phone call', 'While on vacation with high school friends', 'Away on a business trip for an eccentric business owner', 'After reading an article online', 'While setting up a social media profile', 'After having his memories removed'];
	var plotLineTwo = ['must travel to an unknown land forgotten by civilization.', 'needs to recharge his phone battery every 15 minutes.', 'finds the secret to life spelled out by his morning alphabet cereal.', "discovers what is making all that noise in his neighbor's house.", "gets the wrong items from his Wendey's order.", 'rides down a country road late at night and discovers a town secret.', 'runs for mayor instead of pursuing his lifelong dream.', 'explores the existential crisis that is life.', 'accidently washes his delicates with towels in hot water.', "can't find the remote to his TV", 'gets lost in the candy aisle at a local gas station.', 'ponders the limitless possiblities of a multiverse.', 'hitches a stolen car up to a truck and drives fast through the desert.', 'invents a new process for molding cheese.', 'creates a one star Michelin restaurant.', 'folds his shirts the wrong way, making his roommates mad.', 'creates a new flavor of ice cream - spocholate.', 'falls down an infinite staircase and must find a creative way out of this situation.', 'drives really slow during rush hour to make everyone mad.', "jumps into a pond only to discover it's actually a lagoon.", "goes on a journey discovering the meaning of friendship.", "tries to figure out what happened.", "learns the meaning of change.", "recluses into old habits.", "develops a better understanding of his place in this world.", "realizes how fragile the economy is.", "questions whether we're in a simulation.", "develops new friendships.", "becomes a closer confidant for callers to a self-help phone line."];
	
	var movieSelection = getRandomInt(movieTypes.length);
	var directorSelection = getRandomInt(director.length);
	var nameSelector = getRandomInt(name.length);
	var plotSelection = getRandomInt(plotLineOne.length);
	var plotSelectionTwo = getRandomInt(plotLineTwo.length);
	
	// add the first plot
	plot = plotLineOne[plotSelection];
	
	// add the next plot if is pos 0
	if(plotSelection == 0) {
		var plotExtra = ['cats rule the earth', 'dogs control humans', 'one man stands between a truth and a lie', 'a gardner grew the largest tomato', 'bedding was never invented', 'cars use square wheels', 'televisions stayed in black and white', 'doors only opened by pushing', 'staring at someone is considered normal', 'everyone is naked', 'calculators were never invented', ''];
		var extraSelection = getRandomInt(plotExtra.length);
		plot += " " + plotExtra[extraSelection];
	}
	
	// combine the plot with Cage's name
	plot += ", " + name[nameSelector] + " (Nicolas Cage)," + " " + plotLineTwo[plotSelectionTwo] + "\nDirected by: " + director[directorSelection] + "\nFiled under: " + movieTypes[movieSelection];	
		
	return 	plot;
	
} 

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
