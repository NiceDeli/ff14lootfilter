/*
//1. What does this function do? [Scope of the function]

//2. What does this function need? [Parameter]

//3. What does this function return? [Return]

//4. What is the logic of the function? [This is what's inside the f(x)]


//Answer:
//1. It basically finds the minimum date for when a specific static mate can get for their specific desired gear
    //a. Optional but needed, implement kill history such that instead of only one relative point, we use kill history as a 
    //      dynamic relative point of when a person can get their gear
-------------------------------------------------------------------------------------------------------------------
//Barebones of the function
//This is if we are viewing the function as if the tier hasn't started aka we aren't using the kill history

//In a best case universe, we killed floor 1 to 4 in the first week
//That means that Lily will get the chest piece minimum at the second week

//Kill History of the function
//In actuality, we only killed floor 3 at this specific date: The fifth week of when the tier started
//That means that from the start of the tier, Lily can only obtain the chest piece minimum 
    the sixth week of when the tier started

//Not only are we telling Lily that he's getting it on the second kill of the third floor, we need to tell them 
the date range
-------------------------------------------------------------------------------------------------------------------
2. The function could should take in a json object that contains two json arrays:
    //1. Current Loot Json Object Array
    //2. Desirable Loot Json Object Array
    //3. Static Mate Id
[Optional]: Just send in option 2

3. Custom Object Array returns back the desirable_loot_name and minimum_date range
    desirable_loot_name: string
    minimum_date_range: string

4. const lootAlgorithm = async(customObject:{current_loot:CurrentLoot[], desirable_loot:DesirableLoot[]}, staticMateID:number) => {
    [Optional]: Kill History tells us when the loot drops, it is always 100% drop. This is our point of reference 
        when it comes to when we can grab loot based on when the static has killed it

    I need to grab the starting date of when the tier starts. Because this is our starting point for everything
    
    const startingRaidDate = dayjs('2024-07-30')

    We do a findAll for Mitas Algorithm to get for the specific static mates loot situation
        a. We should do a where clause, in which it finds all for the specific static mate id 

    const receiveInfo:MAModel[] = await MAModel.findAll({
        where: {
            static_mate_id: staticMateID
        }
    })

    We do a for loop for the number of desirable_loot array that we are receiving
    We also create a returnObject to push the new data into a return
    const retVal = [];
    Logic of For Loop:
    for(const loot of customObject.desirable_loot) {

        For the specific loot, we need to find it's algorithm in Mita's Alogirthm
        const specificLoot:MaModel = receiveInfo.find((MAObject) => {
            return MAOBject.loot_table_id = loot.id
        })

        Figure out the minimum date range we do:
        const minimum_date = startingRaidDate.add((7 * specificLoot.number_killed), 'day);
        retVal.push({
            desirable_loot_name: loot.loot_name, 
            minimum_date_range: `${minimum_date.format('YYYY-MM-DD')}-${minimum_date.add(6, 'day).format('YYYY-MM-DD')}`
        })
    }

    Outside the for loop:
    return retVal
}
*/
