function sendEmail() {
    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("age", userData.age);
    formData.append("location", userData.location);
    formData.append("email", userData.email);
    formData.append("grievance", userData.grievance);
    formData.append(
        "submission_time",
        new Date().toLocaleString("en-IN")
    );
    formData.append("_subject", `New EVA request from ${userData.name}`);
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    fetch("https://formsubmit.co/ajax/aparnaprakasan911@gmail.com", {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Email submission failed");
            }

            return response.json();
        })
        .then(() => {
            addBotMessage(
                "✅ Your request has been successfully transmitted. EVA will be in touch soon. 💙"
            );
        })
        .catch(error => {
            console.error("FormSubmit error:", error);

            addBotMessage(
                "⚠️ EVA detected a transmission problem. Please try again later."
            );
        });
}
