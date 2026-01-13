(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteFile",
    ()=>deleteFile,
    "getS3Files",
    ()=>getS3Files,
    "uploadFile",
    ()=>uploadFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$S3Client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/client-s3/dist-es/S3Client.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$ListObjectsV2Command$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/client-s3/dist-es/commands/ListObjectsV2Command.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$PutObjectCommand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$HeadObjectCommand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/client-s3/dist-es/commands/HeadObjectCommand.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$DeleteObjectCommand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/client-s3/dist-es/commands/DeleteObjectCommand.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-client] (ecmascript)");
"use strict";
;
;
// Initialize the S3 Client
const s3Client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$S3Client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["S3Client"]({
    region: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_REGION || "us-east-2",
    credentials: {
        accessKeyId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_ACCESS_KEY_ID,
        secretAccessKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_SECRET_ACCESS_KEY
    }
});
async function getS3Files() {
    console.log("DEBUG - Region:", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_REGION);
    console.log("DEBUG - Bucket:", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_BUCKET_NAME);
    try {
        const { Contents } = await s3Client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$ListObjectsV2Command$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListObjectsV2Command"]({
            Bucket: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_BUCKET_NAME
        }));
        return Contents?.map((file)=>({
                key: file.Key,
                size: file.Size,
                lastModified: file.LastModified
            })) || [];
    } catch (error) {
        console.error("AWS List Error:", error);
        return [];
    }
}
async function uploadFile(formData) {
    try {
        const file = formData.get("file");
        if (!file) throw new Error("No file provided");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(arrayBuffer);
        let fileName = file.name;
        let fileExists = true;
        let counter = 1;
        // --- CHECK FOR DUPLICATES LOOP ---
        while(fileExists){
            try {
                await s3Client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$HeadObjectCommand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HeadObjectCommand"]({
                    Bucket: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_BUCKET_NAME,
                    Key: fileName
                }));
                // If HeadObject succeeds, the file exists. Rename and try again.
                const lastDot = file.name.lastIndexOf(".");
                const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
                const extension = lastDot !== -1 ? file.name.substring(lastDot) : "";
                fileName = `${baseName}(${counter})${extension}`;
                counter++;
            } catch (error) {
                // S3 returns "NotFound" (404) if the key is available
                if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
                    fileExists = false;
                } else {
                    throw error;
                }
            }
        }
        // --- UPLOAD FINAL FILENAME ---
        await s3Client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$PutObjectCommand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutObjectCommand"]({
            Bucket: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type
        }));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["revalidatePath"])("/"); // Refresh the UI list
        return {
            success: true,
            fileName
        };
    } catch (error) {
        console.error("Upload Error:", error);
        throw new Error("Failed to upload file");
    }
}
async function deleteFile(key) {
    try {
        await s3Client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$2f$dist$2d$es$2f$commands$2f$DeleteObjectCommand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteObjectCommand"]({
            Bucket: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AWS_BUCKET_NAME,
            Key: key
        }));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
        return {
            success: true
        };
    } catch (error) {
        console.error("Delete Error:", error);
        throw new Error("Failed to delete file");
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Added renameS3File to the imports
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Home() {
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 1. PURE DATA FUNCTION
    const loadFileData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[loadFileData]": async ()=>{
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getS3Files"])();
                return (data || []).map({
                    "Home.useCallback[loadFileData]": (f)=>({
                            key: f.key || "unknown",
                            size: f.size || 0
                        })
                }["Home.useCallback[loadFileData]"]);
            } catch (error) {
                console.error("Data loading error:", error);
                return [];
            }
        }
    }["Home.useCallback[loadFileData]"], []);
    // 2. THE EFFECT
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            let isMounted = true;
            loadFileData().then({
                "Home.useEffect": (formattedFiles)=>{
                    if (isMounted) {
                        setFiles(formattedFiles);
                    }
                }
            }["Home.useEffect"]);
            return ({
                "Home.useEffect": ()=>{
                    isMounted = false;
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        loadFileData
    ]);
    // 3. REFRESH HELPER
    const refreshList = async ()=>{
        const data = await loadFileData();
        setFiles(data);
    };
    async function uploadFile() {
        if (!file) return;
        setUploading(true);
        setStatus("Uploading...");
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });
        setUploading(false);
        if (res.ok) {
            setStatus("Upload successful ✅");
            setFile(null);
            await refreshList();
        } else {
            setStatus("Upload failed ❌");
        }
    }
    function openFilePicker() {
        fileInputRef.current?.click();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 40,
            maxWidth: 800,
            fontFamily: "sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "S3 Storage Manager"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        hidden: true,
                        onChange: (e)=>setFile(e.target.files?.[0] || null)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: openFilePicker,
                        children: "Select File"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: uploadFile,
                        disabled: !file || uploading,
                        style: {
                            marginLeft: 10
                        },
                        children: uploading ? "Uploading..." : "Upload to S3"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            marginLeft: 15
                        },
                        children: [
                            "Selected: ",
                            file.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 95,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: status
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    marginTop: 30
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Your Bucket Files"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: refreshList,
                                children: "Refresh List"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        style: {
                            marginTop: 20,
                            listStyle: "none",
                            padding: 0
                        },
                        children: files.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: "No files found."
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this) : files.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                style: {
                                    padding: "12px 0",
                                    borderBottom: "1px solid #eee",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            flex: 1,
                                            marginRight: "20px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: f.key
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 19
                                            }, this),
                                            " — ",
                                            (f.size / 1024).toFixed(2),
                                            " KB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "10px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: async ()=>{
                                                    const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDownloadUrl"])(f.key);
                                                    window.open(url, "_blank");
                                                },
                                                style: {
                                                    padding: "4px 8px",
                                                    cursor: "pointer"
                                                },
                                                children: "Download"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: async ()=>{
                                                    const newName = prompt("Enter new filename:", f.key);
                                                    if (newName && newName !== f.key) {
                                                        setStatus("Renaming...");
                                                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renameS3File"])(f.key, newName);
                                                        if (result.success) {
                                                            setStatus("Renamed successfully ✅");
                                                            await refreshList();
                                                        } else {
                                                            setStatus("Rename failed ❌");
                                                        }
                                                    }
                                                },
                                                style: {
                                                    padding: "4px 8px",
                                                    cursor: "pointer",
                                                    backgroundColor: "#f0f0f0",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "4px"
                                                },
                                                children: "Rename"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: async ()=>{
                                                    if (confirm(`Are you sure you want to delete ${f.key}?`)) {
                                                        setStatus("Deleting...");
                                                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteS3File"])(f.key);
                                                        if (result.success) {
                                                            setStatus("Deleted successfully ✅");
                                                            await refreshList();
                                                        } else {
                                                            setStatus("Delete failed ❌");
                                                        }
                                                    }
                                                },
                                                style: {
                                                    padding: "4px 8px",
                                                    cursor: "pointer",
                                                    backgroundColor: "#ff4444",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px"
                                                },
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, f.key, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(Home, "NdaZ9kZaCu/m98UrrlKnhCcg33k=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_8be095ca._.js.map