package com.spacestore.controller;
import com.spacestore.Dao.UserDaos;
import com.spacestore.Entity.Userauth;
import com.spacestore.Entity.Loginuser;
import com.spacestore.Service.Loginservice;
import com.spacestore.Util.Jwtutil;
import com.spacestore.Util.SessionUtils;
import com.spacestore.repository.UserTableRepository;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private Loginservice LoginService;

    @Autowired
    private UserDaos userDaos;

    @Autowired
    private UserTableRepository userTableRepository;
@Autowired
private Jwtutil jwtutil;

    @CrossOrigin
    @PostMapping("/process-login")
    public ResponseEntity<returninformation> iflogin(@RequestBody logininformation pd) {
        Userauth user = LoginService.checkLogin(pd.getUsername(), pd.getPassword());
        returninformation returninformation=new returninformation();
        if (user != null&&userTableRepository.findById(user.getId()).getForbid()) {
            SessionUtils.setSession(user);
            returninformation.setUsername(user.getUsername());
            returninformation.setUserType(user.getRoles());
          //  String x=request.getSession().getId();
          //  HttpSession sessionUtils=SessionUtils.getSession();
          //  SessionUtils.setSession(user);
            return ResponseEntity.ok(returninformation);
        } else {
            Userauth userAuth = new Userauth();
            userAuth.setPassword(pd.getPassword());
            userAuth.setUsername(pd.getUsername());
            return ResponseEntity.badRequest().body(returninformation);
        }
    }
    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody signupinformation pd){
        String username=pd.getUsername();
        String email=pd.getEmail();
        String password=pd.getPassword();
        if(userDaos.signupuser(username,email,password)){

            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.badRequest().body(username);
    }

    @CrossOrigin
    @GetMapping("/login")
    public String login(RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("message", "用户未登录，请登录");
        return "rr";
    }

    @Data
    static class logininformation {
        private String username;
        private String password;
    }

    @Data
    static class signupinformation{
        private String username;
        private String email;
        private String password;

    }
    @Data
    static class returninformation{
        String username;
        String userType;
    }
}
