// API service for fetching sports data

// Basketball API endpoints
const BASKETBALL_API = 'https://www.balldontlie.io/api/v1';

// Football API endpoints (commented out as it's not currently used)
// const FOOTBALL_API = 'https://api.football-data.org/v4';

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Get random basketball players
export const getBasketballPlayers = async (count = 5) => {
  try {
    const response = await fetch(`${BASKETBALL_API}/players?per_page=${count}&page=${Math.floor(Math.random() * 10) + 1}`);
    const data = await response.json();
    return data.data.map(player => ({
      id: player.id,
      name: `${player.first_name} ${player.last_name}`,
      team: player.team.full_name,
      position: player.position
    }));
  } catch (error) {
    console.error('Error fetching basketball players:', error);
    // Fallback data in case API fails
    return [
      { id: 1, name: 'LeBron James', team: 'Los Angeles Lakers', position: 'F' },
      { id: 2, name: 'Stephen Curry', team: 'Golden State Warriors', position: 'G' },
      { id: 3, name: 'Kevin Durant', team: 'Phoenix Suns', position: 'F' },
      { id: 4, name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks', position: 'F' },
      { id: 5, name: 'Nikola Jokic', team: 'Denver Nuggets', position: 'C' }
    ];
  }
};

// Get basketball list-based questions for Game 1 (What do you know)
export const getBasketballOpenQuestions = async (count = 5) => {
  const questions = [
    {
      question: "List NBA players who have won multiple championships",
      context: "Players like Michael Jordan (6), Bill Russell (11), Kareem Abdul-Jabbar (6), Kobe Bryant (5), Magic Johnson (5), Tim Duncan (5), LeBron James (4), Shaquille O'Neal (4), Stephen Curry (4), etc."
    },
    {
      question: "List NBA teams that have won multiple championships",
      context: "Boston Celtics (17), Los Angeles Lakers (17), Golden State Warriors (7), Chicago Bulls (6), San Antonio Spurs (5), Philadelphia 76ers (3), Detroit Pistons (3), Miami Heat (3), Milwaukee Bucks (2), Houston Rockets (2), etc."
    },
    {
      question: "List NBA players who have won MVP awards multiple times",
      context: "Kareem Abdul-Jabbar (6), Michael Jordan (5), Bill Russell (5), LeBron James (4), Wilt Chamberlain (4), Magic Johnson (3), Larry Bird (3), Moses Malone (3), Nikola Jokić (3), Giannis Antetokounmpo (2), Stephen Curry (2), etc."
    },
    {
      question: "List NBA players who have scored 60+ points in a single game",
      context: "Wilt Chamberlain, Kobe Bryant, David Thompson, Elgin Baylor, James Harden, Michael Jordan, Damian Lillard, Donovan Mitchell, Devin Booker, Carmelo Anthony, LeBron James, etc."
    },
    {
      question: "List countries that have won Olympic basketball gold medals",
      context: "United States (16), Soviet Union (2), Argentina (1), Yugoslavia (1)"
    },
    {
      question: "List NBA players who have had their jersey numbers retired",
      context: "Michael Jordan, Kobe Bryant, LeBron James, Magic Johnson, Larry Bird, Bill Russell, Wilt Chamberlain, Kareem Abdul-Jabbar, Shaquille O'Neal, Tim Duncan, Dirk Nowitzki, etc."
    },
    {
      question: "List NBA players who have been selected to 10+ All-Star games",
      context: "Kareem Abdul-Jabbar (19), LeBron James (19), Kobe Bryant (18), Tim Duncan (15), Kevin Garnett (15), Shaquille O'Neal (15), Michael Jordan (14), Karl Malone (14), Dirk Nowitzki (14), Jerry West (14), etc."
    },
    {
      question: "List NBA players who have won both regular season MVP and Finals MVP",
      context: "Michael Jordan, LeBron James, Kareem Abdul-Jabbar, Magic Johnson, Tim Duncan, Hakeem Olajuwon, Shaquille O'Neal, Kobe Bryant, Kevin Durant, Stephen Curry, Giannis Antetokounmpo, etc."
    },
    {
      question: "List NBA players who have averaged a triple-double for a season",
      context: "Russell Westbrook, Oscar Robertson, Nikola Jokić"
    },
    {
      question: "List NBA coaches who have won multiple championships",
      context: "Phil Jackson (11), Red Auerbach (9), Gregg Popovich (5), Pat Riley (5), John Kundla (5), Steve Kerr (4), Chuck Daly (2), Erik Spoelstra (2), Rudy Tomjanovich (2), etc."
    }
  ];
  
  return shuffleArray(questions).slice(0, count);
};

// Get football list-based questions for Game 1 (What do you know)
export const getFootballOpenQuestions = async (count = 5) => {
  const questions = [
    {
      question: "List countries that have won the FIFA World Cup",
      context: "Brazil (5), Germany (4), Italy (4), Argentina (3), France (2), Uruguay (2), England (1), Spain (1)"
    },
    {
      question: "List players who have won the Ballon d'Or multiple times",
      context: "Lionel Messi (8), Cristiano Ronaldo (5), Michel Platini (3), Johan Cruyff (3), Marco van Basten (3), Franz Beckenbauer (2), Ronaldo Nazário (2), Alfredo Di Stéfano (2), Kevin Keegan (2), Karl-Heinz Rummenigge (2)"
    },
    {
      question: "List clubs that have won the UEFA Champions League/European Cup multiple times",
      context: "Real Madrid (14), AC Milan (7), Bayern Munich (6), Liverpool (6), Barcelona (5), Ajax (4), Manchester United (3), Inter Milan (3), Chelsea (2), Juventus (2), Benfica (2), Nottingham Forest (2), Porto (2)"
    },
    {
      question: "List players who have scored in a World Cup Final",
      context: "Pelé, Zinedine Zidane, Ronaldo Nazário, Kylian Mbappé, Mario Götze, Geoff Hurst, Gerd Müller, Marco Materazzi, Diego Maradona, Jorge Burruchaga, Mario Kempes, Paolo Rossi, etc."
    },
    {
      question: "List English Premier League teams that have won the title",
      context: "Manchester United, Manchester City, Chelsea, Arsenal, Liverpool, Leicester City, Blackburn Rovers"
    },
    {
      question: "List players who have scored 500+ career goals",
      context: "Cristiano Ronaldo, Lionel Messi, Pelé, Romário, Josef Bican, Ferenc Puskás, Gerd Müller, Robert Lewandowski, Zlatan Ibrahimović, etc."
    },
    {
      question: "List managers who have won the Champions League multiple times",
      context: "Carlo Ancelotti (4), Bob Paisley (3), Zinedine Zidane (3), Pep Guardiola (3), José Mourinho (2), Ottmar Hitzfeld (2), Jupp Heynckes (2), Sir Alex Ferguson (2), etc."
    },
    {
      question: "List players who have played in 4 or more World Cups",
      context: "Antonio Carbajal, Rafael Márquez, Lothar Matthäus, Lionel Messi, Cristiano Ronaldo, Andres Guardado, Guillermo Ochoa, Manuel Neuer, Sergio Ramos, etc."
    },
    {
      question: "List football clubs that have never been relegated from their top division",
      context: "Real Madrid, Barcelona, Athletic Bilbao, Arsenal, Manchester United, Liverpool, Bayern Munich, Ajax, etc."
    },
    {
      question: "List players who have won the World Cup, Champions League, and Ballon d'Or",
      context: "Zinedine Zidane, Ronaldinho, Kaká, Rivaldo, Ronaldo Nazário, Lionel Messi, Kylian Mbappé, etc."
    }
  ];
  
  return shuffleArray(questions).slice(0, count);
};

// Get basketball bidding questions for Game 2
export const getBasketballBiddingQuestions = async (count = 5) => {
  const questions = [
    {
      question: "Name NBA teams that have won multiple championships",
      context: "There are several teams with multiple NBA championships."
    },
    {
      question: "Name NBA players who have scored 60+ points in a single game",
      context: "Several players have achieved this impressive scoring feat."
    },
    {
      question: "Name NBA players who have won multiple MVP awards",
      context: "The MVP award recognizes the most valuable player of the regular season."
    },
    {
      question: "Name countries that have won Olympic basketball gold medals",
      context: "Basketball has been an Olympic sport since 1936."
    },
    {
      question: "Name NBA players who have had their jersey numbers retired",
      context: "Jersey retirement is one of the highest honors a player can receive."
    },
    {
      question: "Name NBA players who have been selected to 10+ All-Star games",
      context: "The All-Star game showcases the league's best talent each year."
    },
    {
      question: "Name NBA players who have won both regular season MVP and Finals MVP",
      context: "These players have proven to be the best in both the regular season and playoffs."
    },
    {
      question: "Name NBA players who have averaged a triple-double for a season",
      context: "A triple-double requires at least 10 points, 10 rebounds, and 10 assists."
    },
    {
      question: "Name NBA players who have won Defensive Player of the Year",
      context: "This award recognizes the league's best defensive player."
    },
    {
      question: "Name NBA coaches who have won multiple championships",
      context: "Great coaches have led their teams to multiple titles."
    }
  ];
  
  return shuffleArray(questions).slice(0, count);
};

// Get football bidding questions for Game 2
export const getFootballBiddingQuestions = async (count = 5) => {
  const questions = [
    {
      question: "Name countries that have won the FIFA World Cup",
      context: "Only eight nations have won the World Cup since its inception."
    },
    {
      question: "Name players who have won the Ballon d'Or",
      context: "The Ballon d'Or is awarded to the world's best player each year."
    },
    {
      question: "Name clubs that have won the UEFA Champions League/European Cup",
      context: "The Champions League is Europe's most prestigious club competition."
    },
    {
      question: "Name players who have scored in a World Cup Final",
      context: "Scoring in a World Cup Final is one of football's greatest achievements."
    },
    {
      question: "Name English Premier League teams that have won the title",
      context: "The Premier League began in 1992, replacing the First Division."
    },
    {
      question: "Name players who have scored 500+ career goals",
      context: "Very few players have achieved this remarkable scoring milestone."
    },
    {
      question: "Name managers who have won the Champions League multiple times",
      context: "Only a select few managers have won Europe's top prize more than once."
    },
    {
      question: "Name players who have played in 4 or more World Cups",
      context: "Playing in multiple World Cups demonstrates exceptional longevity."
    },
    {
      question: "Name football clubs that have never been relegated from their top division",
      context: "Some clubs have maintained their top-flight status for their entire history."
    },
    {
      question: "Name players who have won the World Cup, Champions League, and Ballon d'Or",
      context: "This trifecta represents the pinnacle of achievement in football."
    }
  ];
  
  return shuffleArray(questions).slice(0, count);
};

// Get hard basketball questions for Game 3 (Impossible)
export const getHardBasketballQuestions = async (count = 5) => {
  const questions = [
    {
      question: "Who holds the record for the most consecutive games with a three-pointer made?",
      answer: "Stephen Curry (157 games)"
    },
    {
      question: "Which player recorded the first official quadruple-double in NBA history?",
      answer: "Nate Thurmond"
    },
    {
      question: "What is the record for most points scored by a rookie in their NBA debut?",
      answer: "Wilt Chamberlain (43 points)"
    },
    {
      question: "Which NBA player has the highest career free throw percentage?",
      answer: "Steve Nash (90.43%)"
    },
    {
      question: "Who was the shortest player to ever play in the NBA?",
      answer: "Muggsy Bogues (5'3\")"
    },
    {
      question: "Which player has the most career triple-doubles in NBA history?",
      answer: "Russell Westbrook"
    },
    {
      question: "What was the original name of the Toronto Raptors' home arena when it opened in 1999?",
      answer: "Air Canada Centre"
    },
    {
      question: "Who was the first non-American player to be selected first overall in the NBA draft?",
      answer: "Yao Ming"
    },
    {
      question: "Which NBA player was nicknamed 'The Iceman'?",
      answer: "George Gervin"
    },
    {
      question: "What is the record for most points scored by a team in a single NBA game?",
      answer: "Detroit Pistons (186 points vs. Denver Nuggets in 1983)"
    }
  ];
  
  return shuffleArray(questions).slice(0, count);
};

// Get hard football questions for Game 3 (Impossible)
export const getHardFootballQuestions = async (count = 5) => {
  const questions = [
    {
      question: "Who scored the fastest hat-trick in Premier League history?",
      answer: "Sadio Mané (2 minutes 56 seconds for Southampton vs Aston Villa in 2015)"
    },
    {
      question: "Which player has made the most appearances in FIFA World Cup tournaments?",
      answer: "Antonio Carbajal and Rafael Márquez (5 World Cups each)"
    },
    {
      question: "Which club did Pep Guardiola play for before joining Barcelona as a player?",
      answer: "Brescia"
    },
    {
      question: "Who was the first player to win the Champions League with three different clubs?",
      answer: "Clarence Seedorf (Ajax, Real Madrid, and AC Milan)"
    },
    {
      question: "Which country won the first Women's World Cup in 1991?",
      answer: "United States"
    },
    {
      question: "Who is the youngest goalscorer in World Cup history?",
      answer: "Pelé (17 years and 239 days old)"
    },
    {
      question: "Which player has the record for most goals in a single calendar year?",
      answer: "Lionel Messi (91 goals in 2012)"
    },
    {
      question: "What was the first football club to be established?",
      answer: "Sheffield FC (1857)"
    },
    {
      question: "Which player has won the most Premier League titles?",
      answer: "Ryan Giggs (13 titles)"
    },
    {
      question: "Who scored the 'Hand of God' goal in the 1986 World Cup?",
      answer: "Diego Maradona"
    }
  ];
  
  return shuffleArray(questions).slice(0, count);
};

// Get basketball players for Game 4 (Guess the player)
export const getBasketballPlayersForGuessing = async (count = 5) => {
  const players = [
    {
      name: "LeBron James",
      clues: ["Los Angeles Lakers", "Cleveland Cavaliers", "Miami Heat", "4-time NBA champion", "4-time MVP"]
    },
    {
      name: "Michael Jordan",
      clues: ["Chicago Bulls", "Washington Wizards", "6-time NBA champion", "5-time MVP", "Played baseball briefly"]
    },
    {
      name: "Stephen Curry",
      clues: ["Golden State Warriors", "4-time NBA champion", "2-time MVP", "Greatest shooter of all time", "Davidson College"]
    },
    {
      name: "Kobe Bryant",
      clues: ["Los Angeles Lakers", "5-time NBA champion", "18-time All-Star", "81 points in a single game", "Drafted directly from high school"]
    },
    {
      name: "Shaquille O'Neal",
      clues: ["Los Angeles Lakers", "Orlando Magic", "Miami Heat", "4-time NBA champion", "Dominant center"]
    },
    {
      name: "Kevin Durant",
      clues: ["Brooklyn Nets", "Golden State Warriors", "Oklahoma City Thunder", "Phoenix Suns", "2-time NBA champion"]
    },
    {
      name: "Tim Duncan",
      clues: ["San Antonio Spurs", "5-time NBA champion", "2-time MVP", "The Big Fundamental", "Played his entire career with one team"]
    },
    {
      name: "Magic Johnson",
      clues: ["Los Angeles Lakers", "5-time NBA champion", "3-time MVP", "Olympic Dream Team", "HIV announcement shocked the world"]
    },
    {
      name: "Larry Bird",
      clues: ["Boston Celtics", "3-time NBA champion", "3-time MVP", "Indiana State", "Famous rivalry with Magic Johnson"]
    },
    {
      name: "Kareem Abdul-Jabbar",
      clues: ["Los Angeles Lakers", "Milwaukee Bucks", "6-time NBA champion", "6-time MVP", "All-time leading scorer until 2023"]
    }
  ];
  
  return shuffleArray(players).slice(0, count);
};

// Get football players for Game 4 (Guess the player)
export const getFootballPlayersForGuessing = async (count = 5) => {
  const players = [
    {
      name: "Lionel Messi",
      clues: ["Barcelona", "PSG", "Inter Miami", "Argentina", "8-time Ballon d'Or winner"]
    },
    {
      name: "Cristiano Ronaldo",
      clues: ["Manchester United", "Real Madrid", "Juventus", "Al Nassr", "Portugal"]
    },
    {
      name: "Zinedine Zidane",
      clues: ["Juventus", "Real Madrid", "France", "1998 World Cup winner", "Famous headbutt in 2006 World Cup final"]
    },
    {
      name: "Pelé",
      clues: ["Santos", "New York Cosmos", "Brazil", "3-time World Cup winner", "Scored over 1000 career goals"]
    },
    {
      name: "Diego Maradona",
      clues: ["Boca Juniors", "Barcelona", "Napoli", "Argentina", "1986 World Cup winner"]
    },
    {
      name: "Johan Cruyff",
      clues: ["Ajax", "Barcelona", "Netherlands", "3-time Ballon d'Or winner", "Invented the 'Cruyff Turn'"]
    },
    {
      name: "Ronaldo Nazário",
      clues: ["Barcelona", "Inter Milan", "Real Madrid", "Brazil", "2-time World Cup winner"]
    },
    {
      name: "Thierry Henry",
      clues: ["Arsenal", "Barcelona", "New York Red Bulls", "France", "Premier League all-time top scorer for Arsenal"]
    },
    {
      name: "Xavi Hernandez",
      clues: ["Barcelona", "Al Sadd", "Spain", "World Cup winner", "Current Barcelona manager"]
    },
    {
      name: "Andrés Iniesta",
      clues: ["Barcelona", "Vissel Kobe", "Spain", "Scored winning goal in 2010 World Cup final", "La Masia graduate"]
    }
  ];
  
  return shuffleArray(players).slice(0, count);
};
