package com.integrador.grupo7.service;

import javax.mail.MessagingException;


public interface MailService {

    public void sendSimpleEmail(String to, String subject, String text);

    public void sendEmailWithAttachments(String to, String subject, String text, String attachmentsPath) throws MessagingException;

}