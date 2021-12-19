(function() {
    emailjs.init("user_1pwSWMQVajjnRc7m8XrUh");
})();

window.onload = function(){
    var form = document.getElementById("contact-form");

    form.addEventListener('submit', function(e){
        e.preventDefault();

        // 고유 contact 숫자 랜덤하게 생성
        this.contact_number.value = Math.random() * 100000 | 0;

        emailjs
        .sendForm('service_f9eg1s9','template_9nbf24m',this) //servic Id, templeteId 입력
        .then(
            function(response){
                console.log('메일 발송 성공', response.status, response.text);
                alert("문의 내용이 전송되었습니다.");
                form.reset();
            },
            function(error){
                console.log("메일 발송 실패", error);
                alert("메일 발송에 실패했습니다.");
            }
        );
    });
}