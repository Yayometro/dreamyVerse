// apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IConversation, IMessage } from "../../../../dreamyVerse";

const urlApi = process.env.API_ROUTE || "http://localhost:3503/api/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: urlApi }),
  tagTypes: [
    "getUserTags",
    "getUserByUsername",
    "GetUserDreamsTags",
    "getDream",
    "getAllCommentsFoomDreamPost",
    "isThisPostLikedByTheUser",
    "getAllReactionsFromThisDream",
    "getDiscovery",
    "amIFollowingThisUser",
    "amIFollowingThisDream",
    "getUserDreamsLength",
    "getUsersFollowingDream",
    "getListOfUsersFollowedByUser",
    "getUserFollowers",
    "getHomeFeed",
    "getAllUserNotifications",
    "getAllUserConversations",
    "conversationAlreadyExist",
    "getAllMessagesPerConversation",
  ],
  endpoints: (builder) => ({
    //USER:
    getUser: builder.query({
      query: (userId) => `user/getUser?id=${userId}`,
      providesTags: ["getUserTags"],
    }),
    getUserByUsername: builder.query({
      query: (username) => `user/getUserByUsername?username=${username}`,
      providesTags: ["getUserByUsername"],
    }),
    updateUser: builder.mutation({
        query: (user) => ({
            url: "user/update",
            method: "POST",
            body: user,
        }),
        invalidatesTags: ["getUserTags", "getUserByUsername"],
    }),
    //DREAMS
    getUserDreamsLength: builder.query({
      query: (userId) => `dreams/getUserDreamsLenght?userId=${userId}`,
      providesTags: ["getUserDreamsLength"],
    }),
    getHomeFeed: builder.query({
      query: (userId) => `dreams/getHomeDreamsFeed?userId=${userId}`,
      providesTags: ["getHomeFeed"],
    }),
    getUserDreams: builder.query({
      query: (userId) => `dreams/getUserDreams?id=${userId}`,
      providesTags: ["GetUserDreamsTags"],
    }),
    getDream: builder.query({
      query: (id) => `dreams/getDream?id=${id}`,
      providesTags: ["getDream"],
    }),
    getDiscovery: builder.query({
      query: () => `dreams/getDiscovery`,
      providesTags: ["getDiscovery"],
    }),
    createNewUserDream: builder.mutation({
      query: (newDream) => ({
        url: "dreams/newDream",
        method: "POST",
        body: newDream,
      }),
      invalidatesTags: ["GetUserDreamsTags", "getDiscovery", "getHomeFeed", "getUserDreamsLength", "getAllUserNotifications", "getDream"],
    }),
    removeDream: builder.mutation({
      query: (dreamId) => ({
        url: `dreams/removeDream?dreamId=${dreamId}`,
        method: "POST",
      }),
      invalidatesTags: ["GetUserDreamsTags", "getDiscovery", "getHomeFeed", "getUserDreamsLength", "getDream"],
    }),
    editDream: builder.mutation({
      query: (dream) => ({
        url: `dreams/editDream`,
        method: "POST",
        body: dream,
      }),
      invalidatesTags: ["GetUserDreamsTags", "getDiscovery", "getHomeFeed", "getUserDreamsLength", "getAllUserNotifications", "getDream"],
    }),
    //Comments
    getAllCommentsFoomDreamPost: builder.query({
      query: (dreamId) =>
        `comments/getCommentsFromDreamPost?dreamId=${dreamId}`,
      providesTags: ["getAllCommentsFoomDreamPost"],
    }),
    createNewComment: builder.mutation({
      query: ({ itemToComment, newComment, fromUser, type }) => ({
        url: "comments/newComment",
        method: "POST",
        body: {
          father: itemToComment,
          comment: newComment,
          userMail: fromUser,
          type: type,
        },
      }),
      invalidatesTags: ["getAllCommentsFoomDreamPost"],
    }),
    removeDreamComment: builder.mutation({
      query: (commentId) => ({
        url: "comments/removeCommentDream",
        method: "POST",
        body: { commentId: commentId },
      }),
      invalidatesTags: ["getAllCommentsFoomDreamPost"],
    }),
    editCommentDream: builder.mutation({
      query: (comment) => ({
        url: "comments/editCommentDream",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["getAllCommentsFoomDreamPost"],
    }),
    //REACTIONS
    isThisPostLikedByTheUser: builder.query({
      query: (objectId) =>
        `reactions/isThisPostLikedByTheUser?objectId=${objectId.objectId}&userId=${objectId.userId}&type=${objectId.type}`,
      providesTags: ["isThisPostLikedByTheUser"],
    }),
    getAllReactionsFromThisDream: builder.query({
      query: (dreamId) =>
        `reactions/getAllReactionsFromThisDream?dreamId=${dreamId}`,
      providesTags: ["getAllReactionsFromThisDream"],
    }),
    newReaction: builder.mutation({
      query: (reaction) => ({
        url: "reactions/newReaction",
        method: "POST",
        body: reaction,
      }),
      invalidatesTags: [
        "isThisPostLikedByTheUser",
        "getAllReactionsFromThisDream",
      ],
    }),
    removeReaction: builder.mutation({
      query: (reaction) => ({
        url: `reactions/removeReaction?reactionId=${reaction.reactionId}`,
        method: "POST",
        body: reaction,
      }),
      invalidatesTags: [
        "isThisPostLikedByTheUser",
        "getAllReactionsFromThisDream",
      ],
    }),
    //FOLLOWS
    amIFollowingThisUser: builder.query({
      query: (follow) =>
        `follows/amIFollowingThisUser?follower=${follow.follower}&followed=${follow.followed}`,
      providesTags: ["amIFollowingThisUser"],
    }),
    amIFollowingThisDream: builder.query({
      query: (follow) =>
        `follows/amIFollowingThisDream?follower=${follow.follower}&followed=${follow.followed}`,
      providesTags: ["amIFollowingThisDream"],
    }),
    getUsersFollowingDream: builder.query({
      query: (dreamId) => `follows/getUsersFollowingDream?dreamId=${dreamId}`,
      providesTags: ["getUsersFollowingDream"],
    }),
    getListOfUsersFollowedByUser: builder.query({
      query: (userId) =>
        `follows/getListOfUsersFollowedByUser?userId=${userId}`,
      providesTags: ["getListOfUsersFollowedByUser"],
    }),
    getUserFollowers: builder.query({
      query: (userId) => `follows/getUserFollowers?userId=${userId}`,
      providesTags: ["getUserFollowers"],
    }),
    //Follow Mutations
    newFollow: builder.mutation({
      query: (follow) => ({
        url: "follows/newFollow",
        method: "POST",
        body: follow,
      }),
      invalidatesTags: [
        "amIFollowingThisUser",
        "getListOfUsersFollowedByUser",
        "getUserFollowers",
        "getUsersFollowingDream",
      ],
    }),
    removeFollow: builder.mutation({
      query: (followId) => ({
        url: `follows/removeFollow?followId=${followId}`,
        method: "POST",
        // body: followId,
      }),
      invalidatesTags: [
        "amIFollowingThisUser",
        "getListOfUsersFollowedByUser",
        "getUserFollowers",
        "getUsersFollowingDream",
      ],
    }),
    // NOTIFICATIONS:
    getAllUserNotifications: builder.query({
      query: (userId) =>
        `notifications/getAllUserNotifications?userId=${userId}`,
      providesTags: ["getAllUserNotifications"],
    }),
    createNotification: builder.mutation({
      query: (ids) => ({
        url: `notifications/createNotification`,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["getAllUserNotifications"],
    }),
    removeNotification: builder.mutation({
      query: (id) => ({
        url: `notifications/removeNotification?id=${id}`,
        method: "POST",
        // body: followId,
      }),
      invalidatesTags: ["getAllUserNotifications"],
    }),
    removeAllNotifications: builder.mutation({
      query: (userId) => ({
        url: `notifications/removeAllNotifications?userId=${userId}`,
        method: "POST",
        // body: followId,
      }),
      invalidatesTags: ["getAllUserNotifications"],
    }),
    //CONVERSATIONS
    createUserConversation: builder.mutation({
      query: (conversation:IConversation) => ({
        url: `conversations/createUserConversation`,
        method: "POST",
        body: conversation,
      }),
      invalidatesTags: ["getAllUserConversations"],
    }),
    getAllUserConversations: builder.query({
      query: (userId:string) =>
        `conversations/getAllUserConversations?id=${userId}`,
      providesTags: ["getAllUserConversations"],
    }),
    conversationAlreadyExist: builder.query({
      query: (ids:{one:string, two:string}) =>
        `conversations/conversationAlreadyExist?idOne=${ids.one}&idTwo=${ids.two}`,
      providesTags: ["conversationAlreadyExist"],
    }),
    getAllMessagesPerConversation: builder.query({
      query: (id:string) =>
        `conversations/getAllMessagesPerConversation?id=${id}`,
      providesTags: ["getAllMessagesPerConversation"],
    }),
    //MESSAGES
    createMessage: builder.mutation({
      query: (message:IMessage) => ({
        url: `messages/createMessage`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["getAllMessagesPerConversation"],
    }),
    removeMessage: builder.mutation({
      query: (id:string) => ({
        url: `messages/removeMessage?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getAllMessagesPerConversation"],
    }),
    updateMessage: builder.mutation({
      query: (message:IMessage) => ({
        url: `messages/editMessage`,
        method: "POST",
        body: message
      }),
      invalidatesTags: ["getAllMessagesPerConversation"],
    }),
  }),
});

export const {
  //USER
  useGetUserQuery,
  useGetUserByUsernameQuery,
  useUpdateUserMutation,
  //DREAMS
  useGetUserDreamsQuery,
  useGetDreamQuery,
  useCreateNewUserDreamMutation,
  useRemoveDreamMutation,
  useEditDreamMutation,
  useGetUserDreamsLengthQuery,
  useGetDiscoveryQuery,
  useGetHomeFeedQuery,
  //Comments:
  useCreateNewCommentMutation,
  useGetAllCommentsFoomDreamPostQuery,
  useRemoveDreamCommentMutation,
  useEditCommentDreamMutation,
  //REACTIONS
  useNewReactionMutation,
  useIsThisPostLikedByTheUserQuery,
  useGetAllReactionsFromThisDreamQuery,
  useRemoveReactionMutation,
  // FOLLOWS
  useNewFollowMutation,
  useRemoveFollowMutation,
  useAmIFollowingThisDreamQuery,
  useAmIFollowingThisUserQuery,
  useGetListOfUsersFollowedByUserQuery,
  useGetUserFollowersQuery,
  useGetUsersFollowingDreamQuery,
  //NOTIFICATIONS:
  useCreateNotificationMutation,
  useGetAllUserNotificationsQuery,
  useRemoveNotificationMutation,
  useRemoveAllNotificationsMutation,
  //CONVERSATIONS
  useCreateUserConversationMutation,
  useGetAllUserConversationsQuery,
  useConversationAlreadyExistQuery,
  useGetAllMessagesPerConversationQuery,
  //MESSAGES
  useCreateMessageMutation,
  useRemoveMessageMutation,
  useUpdateMessageMutation,
} = apiSlice;
