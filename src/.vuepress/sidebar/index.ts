import {sidebar} from "vuepress-theme-hope";
import {tools} from "./tools_sidebar.js";
import {leetcode} from "./leetcode_sidebar.js";
import {interview} from "./interview_sidebar.js";
import {note} from "./note_sidebar.js";
export const sidebarConfig = sidebar ({

    "/posts/tools/": tools,
    "/posts/leetcode/": leetcode,
    "/posts/interview/": interview,
    "/posts/note/": note,
});
