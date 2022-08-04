const Tinerary = require('../models/tinerary')

const commentsControllers = {
    
    addComment: async (req, res) => {
        const { tinerary, comment } = req.body.comment
        const user = req.user._id
        
        try {
            const newComment = await Tinerary.findOneAndUpdate({ _id: tinerary }, {$push: { comments: {comment: comment, userId: user, date: Date.now()}}}, { new: true}).populate("comments.userId", {firstName:1, urlImage:1})
            res.json({success: true, response: {newComment}, message:"Thanks for your comment"})
        } 
        catch (error) {
            console.log(error)
            res.json ({ success: false, message: "Something is wrong. Please try again in a few minutes."})
        }
    },

    modifyComment: async (req, res) => {
        const {commentId, comment} = req.body.commentModified
        const user= req.user._id

        try {
            const modifyComment = await Tinerary.findOneAndUpdate({"comments._id":commentId}, {$set: {"comments.$.comment": comment, "comments.$.date": Date.now()}}, {new: true})
            res.json({ success: true, response:{modifyComment}, message: "Your comment has been modified"})
        } 
        catch (error) {
            console.log(error)
            res.json ({ success: false, message: "Something is wrong. Please try again in a few minutes."})
        }
    },
    deleteComment: async (req,res) => {
        const id = req.params.id
        const user = req.user._id

        try {
            const deleteComment = await Tinerary.findOneAndUpdate({"comments._id": id}, {$pull : {comments: {_id: id}}}, {new: true})
            res.json ({success: true, response:{deleteComment}, message: "Your message has been deleted"})
        }
        catch (error) {
            console.log(error)
            res.json ({ success: false, message: "Something is wrong. Please try again in a few minutes."})
        }
    }
}

module.exports = commentsControllers