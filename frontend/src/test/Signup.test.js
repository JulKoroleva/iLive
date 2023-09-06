import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../components/Signup';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils'; 
import { TranslationContext, translations } from '../context/TranslationContext';

describe('Signup component tests', () => {
  const mockOnRegister = jest.fn();

  test('it should handle form submission', () => {
    render(
      <MemoryRouter>
        <TranslationContext.Provider value={translations.en}>
          <Signup onRegister={mockOnRegister} />
        </TranslationContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const signupButton = screen.getByTestId(/test-button/i);

    act(() => {
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password123');
    });

    act(() => {
      fireEvent.click(signupButton);
    });

    expect(mockOnRegister).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('it should display error message for short password', () => {
    render(
      <MemoryRouter>
        <TranslationContext.Provider value={translations.en}>
          <Signup onRegister={mockOnRegister} />
        </TranslationContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const signupButton = screen.getByTestId(/test-button/i);

    act(() => {
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'short'); 
    });

    act(() => {
      fireEvent.click(signupButton);
    });

    const errorMessage = screen.getByText(/Password must be at least 8 characters long, contain at least one uppercase letter and a number/i);
    expect(errorMessage).toBeInTheDocument();
    // screen.debug();
  });
});


describe('Signup component tests: user chose russian language', () => {
    const mockOnRegister = jest.fn();
  
    test('it should handle form submission', () => {
      render(
        <MemoryRouter>
          <TranslationContext.Provider value={translations.ru}>
            <Signup onRegister={mockOnRegister} />
          </TranslationContext.Provider>
        </MemoryRouter>
      );
      const languageButton = screen.getByTestId(/test-lang-button/i)
      const emailInput = screen.getByPlaceholderText('email');
      const passwordInput = screen.getByPlaceholderText('password');
      const signupButton = screen.getByTestId(/test-button/i);
  
      act(() => {
        userEvent.click(languageButton)
      });

      expect(screen.getByTestId('test-ru-lang-button'))
      
      act(() => {
        userEvent.click(screen.getByTestId('test-ru-lang-button'))
      });

      expect(screen.getByText('Русский').toBeInTheDocument)

      act(() => {
        userEvent.type(emailInput, 'test@example.com');
        userEvent.type(passwordInput, 'password123');
      });
  
      act(() => {
        fireEvent.click(signupButton);
      });
  
      expect(mockOnRegister).toHaveBeenCalledWith('test@example.com', 'password123');
      screen.debug()
    });
  
    test('it should display error message for short password', () => {
      render(
        <MemoryRouter>
          <TranslationContext.Provider value={translations.ru}>
            <Signup onRegister={mockOnRegister} />
          </TranslationContext.Provider>
        </MemoryRouter>
      );

      const languageButton = screen.getByTestId(/test-lang-button/i)
      const emailInput = screen.getByPlaceholderText('email');
      const passwordInput = screen.getByPlaceholderText('password');
      const signupButton = screen.getByTestId(/test-button/i);
  
      act(() => {
        userEvent.click(languageButton)
      });

      expect(screen.getByTestId('test-ru-lang-button'))
      
      act(() => {
        userEvent.click(screen.getByTestId('test-ru-lang-button'))
      });

      expect(screen.getByText('Русский').toBeInTheDocument)

      act(() => {
        userEvent.type(emailInput, 'test@example.com');
        userEvent.type(passwordInput, 'short'); 
      });
  
      act(() => {
        fireEvent.click(signupButton);
      });
  
      const errorMessage = screen.getByText(/Пароль должен содержать не менее 8 символов, содержать хотя бы одну заглавную букву и цифру./i);
      expect(errorMessage).toBeInTheDocument();
      screen.debug();
    });
  });