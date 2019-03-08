/// Local Notifications:
// https://www.npmjs.com/package/de.appplant.cordova.plugin.local-notification/v/0.8.5
// https://github.com/katzer/cordova-plugin-local-notifications/wiki - reference
// https://github.com/katzer/cordova-plugin-local-notifications - beware the ReadMe file. This is v0.9.0-beta

// Installation
// cordova plugin add de.appplant.cordova.plugin.local-notification

//Build (XCode 10 causes build issues for iOS so it needs the --buildFlag)
// cordova emulate ios --target="iPhone-8, 12.0" --buildFlag="-UseModernBuildSystem=0"

// Dialogs:
// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/index.html

let app = {
    init: function () {
        document.addEventListener("deviceready", app.ready);
    },
    ready: function () {
        app.addListeners();
    },
    addListeners: function () {

        document.querySelector("#theAddBtn").addEventListener("click", app.showModal);
        document.querySelector("#saveBtn").addEventListener("click", app.addNote);
        document.querySelector("#backBtn").addEventListener("click", app.removeModal);
        document.querySelector("#cancelBtn").addEventListener("click", app.removeModal);

        cordova.plugins.notification.local.on("click", function (notification) {
            navigator.notification.alert("clicked: " + notification.id);
            //user has clicked on the popped up notification
            console.log(notification.data);
        });
        cordova.plugins.notification.local.on("trigger", function (notification) {
            //added to the notification center on the date to trigger it.
            navigator.notification.alert("triggered: " + notification.id);
        });
    },
    addNote: function (ev) {

        let props = cordova.plugins.notification.local.getDefaults();
        //console.log(props);
        /**
         * Notification Object Properties - use it as a reference later on
         * id
         * text
         * title
         * every
         * at
         * data
         * sound
         * badge
         */
        let inOneMin = new Date();
        inOneMin.setMinutes(inOneMin.getMinutes() + 1);
        let idEvent = new Date().getMilliseconds();
        console.log(idEvent);

        let titleInput = document.querySelector("#eventInput");
        let dateInput = document.querySelector("#set-date");

        if (dateInput.value.length == 0){
            alert("Please enter the event's info");
            dateInput.focus();
            return;
            }
            else if (titleInput.value.length == 0){
              alert("Please enter the event's info");
            titleInput.focus();
            return;  
        } else {

            let outputInfo = document.querySelector("#addDate");
            //outputInfo.innerHTML = "";

            let li = document.createElement("li");
            let title = document.createElement("h2");
            let date = document.createElement("p");
            let deleteIcon = document.createElement("i");


            title.textContent = titleInput.value;
            date.textContent = dateInput.value;
            deleteIcon.textContent = "delete";

            deleteIcon.className = "material-icons";
            deleteIcon.id = "deleteBtn";
            deleteIcon.setAttribute("idFromEv", idEvent);

            li.id = idEvent;
            li.className = "li";

            outputInfo.appendChild(li);
            li.appendChild(title);
            li.appendChild(date);
            li.appendChild(deleteIcon);


            app.removeModal();
        }



        console.log(dateInput.value);
        
        let noteOptions = {
            id: idEvent,
            title: titleInput.value,
            text: "Don't forget to do that thing.",
            at: inOneMin,
            badge: 1,
            date: dateInput.value,
//            data: {
//                prop: "prop value",
//                num: 42
//            }
        };
        console.log("Aqui esta la lista " + JSON.stringify(noteOptions));
        //console.log(noteOptions.date);
        
        let time = noteOptions.date;
        let timeStamp = time.valueOf();
        
        console.log(time);
        console.log(timeStamp);
        
        
        //console.log(noteOptions.date.valueOf);
//   cordova.plugins.notification.local.schedule(noteOptions);
//
//        noteOptions.sort(function(a, b){
//            
//            let dateA = new Date(a.date);
//            let dateB = new Date(b.date);
//            return dateA - dateB;
//        })
//        
//        
//        console.log("This is noteOption " + noteOptions);
        
        
        
        
        
        
        
        
        
        
        
        
         
   
        let allDeleteBtn = document.querySelectorAll("#deleteBtn");
        //console.log(allDeleteBtn);

        allDeleteBtn.forEach(function (item) {
            item.addEventListener("click", app.clearSingleItem);
        });

        /**
         * if(props.icon){
          noteOptions.icon = './img/calendar-md-@2x.png'
        }
        if(props.led){
          noteOptions.led = '#33CC00'
        }
        if(props.actions){
          noteOptions.actions = [{ id: "yes", title: "Do it" }, { id: "no", title: "Nah" }]
        }
        **/
       

        // navigator.notification.alert("Added notification id " + id);

       // cordova.plugins.notification.local.cancel(idEvent, function () {
            // will get rid of notification id 1 if it has NOT been triggered or added to the notification center
            // cancelAll() will get rid of all of them
        //});

        cordova.plugins.notification.local.isPresent(idEvent, function (present) {
            // navigator.notification.alert(present ? "present" : "not found");
            // can also call isTriggered() or isScheduled()
            // getAllIds(), getScheduledIds() and getTriggeredIds() will give you an array of ids
            // get(), getAll(), getScheduled() and getTriggered() will get the notification based on an id
        });

    },
    clearSingleItem: function (ev) {
        let thEv = ev.currentTarget;
        let evId = thEv.getAttribute("idFromEv");
        console.log(evId);

        cordova.plugins.notification.local.cancel(evId, function () {
            
            //.clear
            // will dismiss a notification that has been triggered or added to notification center
            let eventList = document.querySelectorAll("li");
            console.log("Esto es mi creacion " + eventList);
            eventList.forEach(function (item) {
                console.log("Este es el # del evento" + item.id)
                if (evId == item.id) {

                    
                    let dialog = confirm("Are you sure you want to delete this event?");
                    if (dialog == true) {
                        console.log("ok")
                        item.parentNode.removeChild(item);
                    } else {
                       console.log("cancel")
                    }
                    
                    
                    console.log("Genio!")
                }
            });


        });
    },
    showModal: function () {
        let modal = document.querySelector(".modal");
        modal.classList.remove("off");
        modal.classList.add("on");

    },
    removeModal: function () {
        let modal = document.querySelector(".modal");
        modal.classList.remove("on");
        modal.classList.add("off");

    },

};
app.init();