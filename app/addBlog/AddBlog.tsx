"use client";

import React, { useCallback, useState } from "react";
import { TextField, Box, Grid } from "@mui/material";
import styles from "./AddBlog.module.css";
import { getPrompt } from "./helpers";
import SmallButton from "@/components/Buttons/SmallButton/SmallButton";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(`${name}: ${value}`);
  }, []);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, content: e.target.value }));
      console.log(`content: ${e.target.value}`);
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    setFormData((prev) => ({ ...prev, content: getPrompt(formData.title) }));
    await navigator.clipboard.writeText(formData.content);
  }, [formData.title, formData.content]);

  return (
    <Box className={styles.container}>
      <Grid
        container
        alignItems="center"
        spacing={2}
        className={styles.titleRow}
      >
        <Grid item xs>
          <TextField
            label="Title"
            name="title"
            size="small"
            value={formData.title}
            onInput={handleInput}
            fullWidth
            className={styles.titleInput}
          />
        </Grid>
        <Grid item>
          <SmallButton
            onClick={handleGenerate}
            disabled={!formData.title.length}
          >
            Generate & Copy
          </SmallButton>
        </Grid>
      </Grid>

      <TextField
        className={styles.textarea}
        rows={30}
        name="content"
        multiline
        value={formData.content}
        onChange={handleContentChange}
        placeholder="Write your prompt here..."
      />
    </Box>
  );
};

export default AddBlog;
