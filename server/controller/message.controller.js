import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: reciverId } = req.params;

        const senderId = req.user._id;
        // sometimes this also works: req.user._conditions._id 

        // Error: `Conversation.create` should be `new Conversation`, or it will fail.
        let chat = await Conversation.findOne({
            participants: {
                $all: [senderId, reciverId],
            },
        });

        if (!chat) {
            chat = new Conversation({
                participants: [senderId, reciverId], // Error: This should just be an array, no need for `$all` inside create.
            });
        }

        const newMessage = new Message({
            senderId,
            reciverId, // Typo: should be `receiverId` for consistency
            message,
            conversationId: chat._id,
        });

        // Error: `chat.message.push()` will fail if `chat.message` is undefined.
        if (newMessage) {
            if (!chat.message) chat.message = []; // Ensure array exists
            chat.message.push(newMessage._id);
        }

        await Promise.all([chat.save(), newMessage.save()]);

        res.status(200).send({
            success: true,
            message: "Message Sent",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in sending the message",
        });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        const chat = await Conversation.findOne({
            participants: {
                $all: [senderId, reciverId],
            },
        }).populate("message");

        if (!chat) {
            // Error: Add return here to avoid sending two responses.
            return res.status(200).send({
                success: true,
                message: "No Message Found",
            });
        }

        const messages = chat.message;
        res.status(200).send({
            success: true,
            messages,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting the message",
        });
    }
};


// ### 1. **Directly using `new Message()` vs `.create()`**

// - **`new Message()`**: 
//    This is used to create an instance of the Mongoose model. You manually create the object using the `new` keyword and then call `save()` to insert it into the database.

//    Example:
//    ```javascript
//    const message = new Message({
//        senderId,
//        reciverId,
//        message,
//        conversationId,
//    });
//    await message.save();  // Saves to the database
//    ```

// - **`Message.create()`**: 
//    This is a shorthand for creating a new document and saving it in one step. It does both `new` and `save()` in one go, making it simpler.

//    Example:
//    ```javascript
//    const message = await Message.create({
//        senderId,
//        reciverId,
//        message,
//        conversationId,
//    });
//    ```

// **When to use which:**
// - Use **`new Model()`** when you need to do something with the object before saving (like adding methods or additional logic).
// - Use **`.create()`** for a simpler, direct creation and save operation.

// ---

// ### 2. **`Promise.all`**:

// **`Promise.all()`** is a method that takes an array of promises and executes them concurrently (in parallel). It waits until all promises have either resolved or any one of them is rejected.

// In your case, this line:
// ```javascript
// await Promise.all([chat.save(), newMessage.save()]);
// ```
// means both `chat.save()` and `newMessage.save()` are being executed at the same time. It waits for both to complete (successfully or with an error) before proceeding.

// **Why use it?**
// - When you need to perform multiple asynchronous operations in parallel and only proceed once all have completed.
